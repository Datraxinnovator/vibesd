import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Zap, Sparkles, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
export function PricingPage() {
  return (
    <AppLayout container className="bg-black">
      <div className="max-w-7xl mx-auto space-y-16">
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest mx-auto">
            <Zap className="w-3 h-3" /> Intelligence Scaling
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white">Select Your <span className="text-gradient">Tier</span></h1>
          <p className="text-zinc-500 max-w-xl mx-auto">Choose the level of sovereign intelligence execution required for your operations.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Standard"
            price="0"
            description="Ideal for early architects exploring the forge."
            features={['Access to Gemini 2.5 Flash', 'Standard tool access', '10 Active units', 'Global edge deployment']}
            buttonText="Begin Architecting"
            icon={<Zap className="w-5 h-5" />}
          />
          <PricingCard
            title="Professional"
            price="49"
            description="The gold standard for high-performance workflows."
            features={['Everything in Standard', 'Access to Gemini 2 Pro', 'Unlimited active units', 'Priority model routing', 'High-priority support']}
            buttonText="Scale Your Forge"
            icon={<Sparkles className="w-5 h-5" />}
            highlighted
          />
          <PricingCard
            title="Sovereign"
            price="199"
            description="For elite architects demanding pure intelligence power."
            features={['Everything in Pro', 'Unlimited token limits', 'Custom MCP integration', 'Dedicated concierge engineer', 'Military-grade persistence']}
            buttonText="Assume Sovereignty"
            icon={<Shield className="w-5 h-5" />}
            elite
          />
        </div>
        <div className="text-center py-12 border-t border-primary/10">
          <p className="text-sm text-zinc-500">Need enterprise-wide deployment? <span className="text-primary hover:underline cursor-pointer font-bold">Contact our Strategic Liaison</span></p>
        </div>
      </div>
    </AppLayout>
  );
}
function PricingCard({ title, price, description, features, buttonText, icon, highlighted, elite }: any) {
  return (
    <Card className={cn(
      "relative border-primary/10 bg-zinc-950/40 backdrop-blur-md transition-all duration-500 flex flex-col h-full overflow-hidden",
      highlighted && "border-primary/40 shadow-glow scale-105 z-10",
      elite && "border-primary/60 shadow-glow-lg bg-zinc-950"
    )}>
      {highlighted && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
      <CardHeader className="p-8">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 border transition-colors",
          highlighted || elite ? "bg-primary text-black border-primary" : "bg-zinc-900 text-primary border-white/5")}>
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
        <div className="flex items-baseline gap-1 mt-4">
          <span className="text-4xl font-black text-white">${price}</span>
          <span className="text-zinc-500 text-sm font-bold">/ MONTHLY</span>
        </div>
        <p className="text-zinc-500 text-sm mt-4 leading-relaxed">{description}</p>
      </CardHeader>
      <CardContent className="px-8 flex-1">
        <div className="space-y-4">
          {features.map((f: string) => (
            <div key={f} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Check className="w-2.5 h-2.5" />
              </div>
              <span className="text-xs text-zinc-300 font-medium">{f}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-8 mt-auto">
        <Button className={cn(
          "w-full py-7 rounded-2xl font-bold text-lg transition-all",
          (highlighted || elite) ? "btn-gradient" : "bg-zinc-900 hover:bg-zinc-800 border border-white/5 text-white"
        )}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}