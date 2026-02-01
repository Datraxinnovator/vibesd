import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { LifeBuoy, Send, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
export function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Priority ticket dispatched to the concierge team.');
    setSubmitted(true);
  };
  return (
    <AppLayout container className="bg-black">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest mx-auto">
            <LifeBuoy className="w-3 h-3" /> Concierge Services
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Concierge <span className="text-gradient">Support</span></h1>
          <p className="text-zinc-500 max-w-xl mx-auto">Direct access to the elite engineering team. Expect a response within the sovereign protocol window (2h).</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 border-primary/10 bg-zinc-950/40 backdrop-blur-md overflow-hidden">
            <CardContent className="p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Inquiry Subject</label>
                    <Input placeholder="Technical architecture assistance" className="bg-black border-white/10 h-12 rounded-xl text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Description</label>
                    <Textarea placeholder="Explain your requirement in detail..." className="bg-black border-white/10 min-h-[150px] rounded-xl text-white resize-none" />
                  </div>
                  <Button type="submit" className="w-full btn-gradient py-7 rounded-2xl font-bold shadow-glow">
                    <Send className="w-4 h-4 mr-2" /> Dispatch Request
                  </Button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-6 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto border border-primary/20 text-primary">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Request Logged</h3>
                    <p className="text-zinc-500">Your high-priority inquiry has been registered in the secure ledger.</p>
                  </div>
                  <Button variant="link" onClick={() => setSubmitted(false)} className="text-primary">Create another ticket</Button>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-950 border border-primary/10 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <MessageSquare className="w-5 h-5" />
                <h4 className="font-bold uppercase tracking-tight">Direct Comms</h4>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">Enterprise members have direct access to our encrypted Slack and Discord channels.</p>
              <Button variant="outline" className="w-full border-primary/20 text-primary rounded-xl h-11 text-xs font-bold">Join Sovereign HQ</Button>
            </div>
            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Sparkles className="w-5 h-5" />
                <h4 className="font-bold uppercase tracking-tight">VIP Routing</h4>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">Your account is currently prioritized for ultra-low latency support response.</p>
              <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                <div className="h-full bg-primary w-full shadow-[0_0_10px_#FFD700]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}