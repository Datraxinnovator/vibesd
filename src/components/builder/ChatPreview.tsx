import React, { useState, useEffect, useRef } from 'react';
import { chatService } from '@/lib/chat';
import { AgentConfig } from '@/lib/store';
import { Message } from '../../../worker/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
interface ChatPreviewProps {
  agent: AgentConfig;
}
export function ChatPreview({ agent }: ChatPreviewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatService.switchSession(agent.id);
    loadMessages();
  }, [agent.id]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);
  const loadMessages = async () => {
    const res = await chatService.getMessages();
    if (res.success && res.data) {
      setMessages(res.data.messages || []);
    }
  };
  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    try {
      const res = await chatService.sendMessage(userMsg.content, agent.model);
      if (res.success) {
        loadMessages();
      }
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <div className="flex flex-col h-full overflow-hidden bg-black">
      <div className="h-12 border-b border-primary/10 px-6 flex items-center bg-zinc-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
          <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">Live Intelligence Stream</span>
        </div>
      </div>
      <ScrollArea className="flex-1 px-6 py-8">
        <div className="space-y-8 max-w-3xl mx-auto">
          {messages.length === 0 && !isTyping && (
            <div className="py-20 text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-primary/5 border border-primary/20 flex items-center justify-center mx-auto text-primary shadow-inner">
                <Sparkles className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white tracking-tight">Challenge {agent.name}</h4>
                <p className="text-zinc-500 max-w-sm mx-auto">
                  Execute initial prompts to calibrate the behavior and intelligence of your new elite agent.
                </p>
              </div>
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className={cn("flex gap-4 items-end animate-fade-in", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg",
                m.role === 'user' ? "bg-primary text-black border border-primary/40" : "bg-zinc-900 text-primary border border-primary/10")}>
                {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={cn("max-w-[80%] p-5 rounded-[1.5rem] text-sm leading-relaxed font-medium shadow-2xl",
                m.role === 'user' 
                  ? "bg-primary text-black rounded-br-none" 
                  : "bg-zinc-900/60 text-white rounded-bl-none border border-primary/10 backdrop-blur-sm")}>
                {m.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-primary/20 flex items-center justify-center shadow-lg">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
              <div className="bg-zinc-900/60 p-5 rounded-[1.5rem] rounded-bl-none border border-primary/10">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} className="h-4" />
        </div>
      </ScrollArea>
      <div className="p-6 border-t border-primary/10 bg-zinc-950/80 backdrop-blur-xl">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-4">
          <Input
            placeholder={`Execute prompt for ${agent.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-zinc-900/80 border-primary/10 h-14 rounded-2xl focus-visible:ring-primary/40 text-white placeholder:text-zinc-600"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={isTyping || !input.trim()} className="btn-gradient w-14 h-14 rounded-2xl shadow-glow shrink-0">
            <Send className="w-6 h-6" />
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-1 h-1 rounded-full bg-primary/40" />
          <p className="text-[10px] uppercase font-black tracking-widest text-zinc-700">
            Elite Protocol Active • High Priority Routing
          </p>
          <div className="w-1 h-1 rounded-full bg-primary/40" />
        </div>
      </div>
    </div>
  );
}