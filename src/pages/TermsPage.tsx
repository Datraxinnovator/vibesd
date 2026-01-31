import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Gavel, AlertCircle, Terminal, HelpCircle } from 'lucide-react';
export function TermsPage() {
  return (
    <AppLayout container className="bg-black">
      <div className="max-w-3xl mx-auto space-y-16">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest">
            <Gavel className="w-3 h-3" /> Execution Protocols
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Terms of <span className="text-gradient">Service</span></h1>
          <p className="text-zinc-500 text-lg">The governing rules for architecting on the Vox0-ki intelligence engine.</p>
        </header>
        <div className="prose prose-invert max-w-none space-y-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">1. Acceptable Execution</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Architects agree to use Vox0-ki for lawful purposes only. The creation of intelligence units designed for malicious cyber operations, automated harassment, or illegal financial activities is strictly prohibited and will result in immediate unit decommissioning.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">2. Resource Constraints</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Vox0-ki reserves the right to throttle or suspend units that exhibit erratic resource consumption patterns that threaten the stability of the global mesh. Sovereign tier architects receive higher tolerance windows for intensive operations.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">3. Liability Limits</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              The platform provides the tools for intelligence creation; the architect is solely responsible for the actions and outcomes of their deployed units. Vox0-ki is not liable for hallucinations, incorrect data retrieval, or unintended tool execution consequences.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">4. Persistence & Deletion</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Decommissioned units are wiped from the active ledger immediately. Recovering intelligence states from deleted units is not supported by standard protocols.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-10 bg-zinc-950 rounded-[2.5rem] border border-primary/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-primary border border-white/5">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white">Confused by the protocols?</h4>
              <p className="text-xs text-zinc-500">Our support engineers can clarify any legal constraint.</p>
            </div>
          </div>
          <Button asChild className="btn-gradient px-8 h-12 rounded-xl">
            <Link to="/support">Contact Legal Support</Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}