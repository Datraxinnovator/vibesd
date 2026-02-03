import { Agent } from 'agents';
import type { Env } from './core-utils';
import type { ChatState } from './types';
import { ChatHandler } from './chat';
import { API_RESPONSES } from './config';
import { createMessage, createStreamResponse, createEncoder } from './utils';
export class ChatAgent extends Agent<Env, ChatState> {
  private chatHandler?: ChatHandler;
  initialState: ChatState = {
    messages: [],
    sessionId: crypto.randomUUID(),
    isProcessing: false,
    streamingMessage: '',
    model: 'google-ai-studio/gemini-2.5-flash',
    systemPrompt: 'You are a helpful AI assistant.',
    enabledTools: ['web_search', 'get_weather', 'd1_db', 'mcp_server']
  };
  async onStart(): Promise<void> {
    console.log(`[AGENT START] Session: ${this.state.sessionId}`);
    const model = this.state.model;
    this.chatHandler = new ChatHandler(
      this.env.CF_AI_BASE_URL,
      this.env.CF_AI_API_KEY,
      model
    );
  }
  async onRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const method = request.method;
    console.log(`[REQUEST] ${method} ${url.pathname} (Session: ${this.state.sessionId})`);
    try {
      if (method === 'GET' && url.pathname === '/messages') {
        return this.handleGetMessages();
      }
      if (method === 'POST') {
        // Robust JSON parsing for all POST routes
        let body;
        try {
          body = await request.json();
        } catch (e) {
          console.error('[BODY PARSE ERROR]', e);
          return Response.json({ success: false, error: 'Malformed JSON payload' }, { status: 400 });
        }
        if (url.pathname === '/chat') return this.handleChatMessage(body);
        if (url.pathname === '/model') return this.handleModelUpdate(body);
        if (url.pathname === '/system-prompt') return this.handleSystemPromptUpdate(body);
        if (url.pathname === '/tools') return this.handleToolsUpdate(body);
      }
      if (method === 'DELETE' && url.pathname === '/clear') {
        return this.handleClearMessages();
      }
      return Response.json({ success: false, error: API_RESPONSES.NOT_FOUND }, { status: 404 });
    } catch (error) {
      console.error('[FATAL AGENT ERROR]', error);
      this.setState({ ...this.state, isProcessing: false }); // Reset state on crash
      return Response.json({ success: false, error: API_RESPONSES.INTERNAL_ERROR, detail: String(error) }, { status: 500 });
    }
  }
  private handleGetMessages(): Response {
    return Response.json({ success: true, data: this.state });
  }
  private async handleChatMessage(body: any): Promise<Response> {
    const { message, model, stream } = body;
    if (!message?.trim()) {
      return Response.json({ success: false, error: API_RESPONSES.MISSING_MESSAGE }, { status: 400 });
    }
    console.log(`[CHAT] Processing message (${message.length} chars). Model: ${model || this.state.model}. Stream: ${!!stream}`);
    if (model && model !== this.state.model) {
      const newModel = model;
      this.setState({ ...this.state, model: newModel });
      this.chatHandler?.updateModel(newModel);
    }
    if (!this.chatHandler) {
      this.chatHandler = new ChatHandler(this.env.CF_AI_BASE_URL, this.env.CF_AI_API_KEY, this.state.model);
    }
    const userMessage = createMessage('user', message.trim());
    this.setState({
      ...this.state,
      messages: [...this.state.messages, userMessage],
      isProcessing: true
    });
    try {
      if (stream) {
        const { readable, writable } = new TransformStream();
        const writer = writable.getWriter();
        const encoder = createEncoder();
        // Background streaming loop
        (async () => {
          console.log(`[STREAM] Initializing neural stream for ${this.state.sessionId}`);
          try {
            this.setState({ ...this.state, streamingMessage: '' });
            const currentState = this.state;
            const response = await this.chatHandler!.processMessage(
              message,
              currentState.messages,
              (chunk: string) => {
                this.setState({
                  ...this.state,
                  streamingMessage: (this.state.streamingMessage || '') + chunk
                });
                writer.write(encoder.encode(chunk)).catch(e => console.error('[STREAM WRITE ERROR]', e));
              },
              currentState
            );
            const assistantMessage = createMessage('assistant', response.content, response.toolCalls);
            this.setState({
              ...currentState,
              messages: [...currentState.messages, assistantMessage],
              isProcessing: false,
              streamingMessage: ''
            });
            console.log(`[STREAM COMPLETE] ${this.state.sessionId}`);
          } catch (error) {
            console.error('[STREAM ERROR]', error);
            const errorText = `[Neural Stream Interruption] ${String(error)}`;
            writer.write(encoder.encode(errorText)).catch(() => {});
            this.setState({
              ...currentState,
              messages: [...currentState.messages, createMessage('assistant', errorText)],
              isProcessing: false,
              streamingMessage: ''
            });
          } finally {
            writer.close().catch(() => {});
          }
        })();
        return createStreamResponse(readable);
      }
      // Non-streaming path
      const response = await this.chatHandler!.processMessage(message, this.state.messages, undefined, this.state);
      const assistantMessage = createMessage('assistant', response.content, response.toolCalls);
      this.setState({ ...this.state, messages: [...this.state.messages, assistantMessage], isProcessing: false });
      return Response.json({ success: true, data: this.state });
    } catch (error) {
      console.error('[CHAT EXECUTION ERROR]', error);
      this.setState({ ...this.state, isProcessing: false });
      return Response.json({ success: false, error: API_RESPONSES.PROCESSING_ERROR, detail: String(error) }, { status: 500 });
    }
  }
  private handleClearMessages(): Response {
    console.log(`[CLEAR] Resetting memory for ${this.state.sessionId}`);
    this.setState({ ...this.state, messages: [] });
    return Response.json({ success: true, data: this.state });
  }
  private handleModelUpdate(body: unknown): Response {
    const { model } = body as { model: string };
    if (!model || typeof model !== 'string') {
      return Response.json({ success: false, error: API_RESPONSES.MISSING_MESSAGE }, { status: 400 });
    }
    console.log(`[CONFIG] Switching model to ${model}`);
    this.setState({ ...this.state, model });
    this.chatHandler?.updateModel(model);
    return Response.json({ success: true, data: this.state });
  }
  private handleSystemPromptUpdate(body: unknown): Response {
    const { systemPrompt } = body as { systemPrompt: string };
    if (!systemPrompt || typeof systemPrompt !== 'string') {
      return Response.json({ success: false, error: API_RESPONSES.MISSING_MESSAGE }, { status: 400 });
    }
    console.log(`[CONFIG] Updating system prompt (${systemPrompt.length} chars)`);
    this.setState({ ...this.state, systemPrompt });
    return Response.json({ success: true, data: this.state });
  }
  private handleToolsUpdate(body: unknown): Response {
    const { tools } = body as { tools: string[] };
    if (!Array.isArray(tools)) {
      return Response.json({ success: false, error: API_RESPONSES.MISSING_MESSAGE }, { status: 400 });
    }
    console.log(`[CONFIG] Updating enabled tools: ${tools.join(', ')}`);
    this.setState({ ...this.state, enabledTools: tools });
    return Response.json({ success: true, data: this.state });
  }
}