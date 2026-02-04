import type { Message, ChatState, ToolCall, WeatherResult, MCPResult, ErrorResult, SessionInfo } from '../../worker/types';
export interface ChatResponse {
  success: boolean;
  data?: ChatState;
  error?: string;
}
export const MODELS = [
  { id: 'google-ai-studio/gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
  { id: 'google-ai-studio/gemini-2.0-pro-exp', name: 'Gemini 2.0 Pro (Experimental)' },
  { id: 'google-ai-studio/gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
  { id: 'google-ai-studio/gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
];
class ChatService {
  private sessionId: string;
  private baseUrl: string;
  constructor() {
    this.sessionId = crypto.randomUUID();
    this.baseUrl = `/api/chat/${this.sessionId}`;
  }
  /** Sends a message to the agent neural stream */
  async sendMessage(
    message: string,
    model?: string,
    onChunk?: (chunk: string) => void
  ): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, model, stream: !!onChunk }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[CHAT_SERVICE ERROR] HTTP ${response.status}: ${errorText}`);
        return {
          success: false,
          error: `Protocol failure (${response.status}). Verify your environment configuration.`
        };
      }
      if (onChunk && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            if (chunk) onChunk(chunk);
          }
        } catch (streamError) {
          console.error('[STREAM READ ERROR]', streamError);
          return { success: false, error: 'Neural stream interrupted during transmission.' };
        } finally {
          reader.releaseLock();
        }
        return { success: true };
      }
      return await response.json();
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error('[NETWORK ERROR]', errMsg);
      return { success: false, error: `Network connectivity failure: ${errMsg}` };
    }
  }
  /** Updates the agent's core system directive */
  async updateSystemPrompt(systemPrompt: string): Promise<ChatResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/system-prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt }),
      });
      return await res.json();
    } catch (error) {
      return { success: false, error: 'Failed to sync prompt architecture' };
    }
  }
  /** Synchronizes enabled intelligence tools */
  async updateTools(tools: string[]): Promise<ChatResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/tools`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tools }),
      });
      return await res.json();
    } catch (error) {
      return { success: false, error: 'Failed to sync intelligence protocols' };
    }
  }
  /** Retrieves neural logs for the current session */
  async getMessages(): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/messages`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Memory retrieval failed' };
    }
  }
  /** Wipes neural logs from the active ledger */
  async clearMessages(): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/clear`, { method: 'DELETE' });
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Memory wipe failed' };
    }
  }
  getSessionId(): string { return this.sessionId; }
  newSession(): void {
    this.sessionId = crypto.randomUUID();
    this.baseUrl = `/api/chat/${this.sessionId}`;
  }
  switchSession(sessionId: string): void {
    this.sessionId = sessionId;
    this.baseUrl = `/api/chat/${sessionId}`;
  }
  /** Lists all registered sessions in the control plane */
  async listSessions(): Promise<{ success: boolean; data: SessionInfo[] }> {
    try {
      const res = await fetch('/api/sessions');
      return await res.json();
    } catch (e) {
      return { success: false, data: [] };
    }
  }
  /** Registers a new session architecture */
  async createSession(title?: string, sessionId?: string, firstMessage?: string): Promise<{ success: boolean; data: SessionInfo }> {
    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, sessionId, firstMessage })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: 'Session creation failed' } as any;
    }
  }
  /** Decommissions a session from the control plane */
  async deleteSession(sessionId: string): Promise<{ success: boolean }> {
    try {
      const res = await fetch(`/api/sessions/${sessionId}`, { method: 'DELETE' });
      return await res.json();
    } catch (e) {
      return { success: false };
    }
  }
  /** Switches the active neural model */
  async updateModel(model: string): Promise<ChatResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/model`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: 'Model switch failed' };
    }
  }
}
export const chatService = new ChatService();
export const formatTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
export const renderToolCall = (toolCall: ToolCall): string => {
  const result = toolCall.result as any;
  if (!result) return `⏳ ${toolCall.name}: Processing...`;
  if ('error' in result) return `❌ ${toolCall.name}: Error`;
  switch (toolCall.name) {
    case 'get_weather':
      return `🌤️ ${result.location}: ${result.temperature}°C`;
    case 'web_search':
      return `🔍 Search: ${toolCall.arguments.query ? String(toolCall.arguments.query).slice(0, 15) + '...' : 'Complete'}`;
    case 'd1_db':
      return `🗄️ D1: Sync Complete`;
    case 'mcp_server':
      return `⚡ MCP: Handshake Success`;
    default:
      return `🔧 ${toolCall.name}: Success`;
  }
};