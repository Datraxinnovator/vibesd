import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
export function PolicyPage() {
  return (
    <AppLayout container className="bg-black">
      <div className="max-w-3xl mx-auto space-y-16">
        <header className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest">
              <Shield className="w-3 h-3" /> Security Standards
            </div>
            <Badge variant="outline" className="border-primary/20 text-[10px] text-zinc-500 font-mono">
              LAST UPDATED: FEB 2025
            </Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Privacy <span className="text-gradient">Protocols</span></h1>
          <p className="text-zinc-500 text-lg">We maintain the highest standards of data sovereignty for our elite architects.</p>
        </header>
        <div className="space-y-12">
          <PolicySection 
            title="1. Neural Data Sovereignty" 
            content="All system prompts, unit configurations, and execution logs are encrypted at rest. Vox0-ki employees do not have access to the internal logic of your deployed units unless explicit debugging access is granted by the architect."
          />
          <PolicySection 
            title="2. Intelligence Logs" 
            content="To ensure stability, we collect metadata regarding execution duration, model usage, and error rates. These logs are strictly used for platform optimization and never include the content of the intelligence exchange."
          />
          <PolicySection 
            title="3. Cookie Protocol" 
            content="We use functional cookies to maintain your workspace session and preferences. We do not use third-party tracking cookies or sell your interaction data to external intelligence agencies."
          />
          <PolicySection 
            title="4. Global Compliance" 
            content="While Vox0-ki operates on a sovereign mesh, we comply with global data protection requests where technically feasible, while prioritizing the architect's right to digital self-governance."
          />
        </div>
        <div className="p-8 rounded-3xl bg-zinc-950 border border-primary/10 text-center space-y-4">
          <Lock className="w-8 h-8 mx-auto text-primary opacity-60" />
          <h4 className="text-white font-bold">Have a Privacy Inquiry?</h4>
          <p className="text-zinc-500 text-xs">Reach out to our Data Protection Liaison through the support module.</p>
        </div>
      </div>
    </AppLayout>
  );
}
function PolicySection({ title, content }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        {title}
      </h3>
      <p className="text-zinc-400 leading-relaxed pl-4 border-l border-white/5">
        {content}
      </p>
    </div>
  );
}