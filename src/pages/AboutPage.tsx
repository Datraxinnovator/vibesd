import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Shield, Zap, Cpu, Users, Globe, Target } from 'lucide-react';
export function AboutPage() {
  return (
    <AppLayout container className="bg-black">
      <div className="max-w-4xl mx-auto space-y-20">
        <header className="text-center space-y-8 py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest mx-auto">
            <Target className="w-3 h-3" /> The Sovereign Narrative
          </div>
          <h1 className="text-display font-bold tracking-tight text-white">Architecting the <br /><span className="text-gradient">Future of Intel</span></h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Vox0-ki was founded on a simple yet radical premise: that every architect deserves total sovereignty over their intelligent fleet.
          </p>
        </header>
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-white border-b border-primary/10 pb-6">Core Protocols</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AboutValue 
              icon={<Shield className="w-6 h-6" />}
              title="Absolute Privacy"
              desc="Your neural logs and unit architectures are encrypted end-to-end. We believe in total data sovereignty."
            />
            <AboutValue 
              icon={<Zap className="w-6 h-6" />}
              title="Hyper Performance"
              desc="Built for speed. Our global edge mesh ensures model inferences happen with minimal latency, globally."
            />
            <AboutValue 
              icon={<Cpu className="w-6 h-6" />}
              title="Unit Persistence"
              desc="Your units are alive 24/7. Once deployed, they execute their directives autonomously across our persistent network."
            />
            <AboutValue 
              icon={<Globe className="w-6 h-6" />}
              title="Global Scaling"
              desc="From local testing to global deployment. Scalability is baked into the very core of the Vox0-ki engine."
            />
          </div>
        </section>
        <section className="bg-zinc-950 p-12 rounded-[3rem] border border-primary/10 space-y-8">
          <h2 className="text-2xl font-bold text-white text-center">Our Mission</h2>
          <p className="text-zinc-400 text-lg leading-relaxed text-center max-w-2xl mx-auto">
            To provide the world's most sophisticated workspace for the creation, management, and scaling of autonomous sovereign intelligence. We don't just build agents; we enable architects to command the future.
          </p>
          <div className="flex justify-center pt-8">
             <div className="flex -space-x-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-12 h-12 rounded-full border-4 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-primary">
                    V{i}
                 </div>
               ))}
               <div className="w-12 h-12 rounded-full border-4 border-black bg-primary flex items-center justify-center text-[10px] font-bold text-black">
                 +50k
               </div>
             </div>
          </div>
          <p className="text-center text-xs text-zinc-600 font-bold uppercase tracking-widest">Architects already scaling on Vox0-ki</p>
        </section>
      </div>
    </AppLayout>
  );
}
function AboutValue({ icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-3xl bg-zinc-950 border border-white/5 hover:border-primary/20 transition-all space-y-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
    </div>
  );
}