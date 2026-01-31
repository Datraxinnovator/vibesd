import React, { useState } from 'react';
import { AgentConfig } from '@/lib/store';
import { ChatPreview } from './ChatPreview';
import { NeuralDevTools } from './NeuralDevTools';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Monitor, Smartphone, Maximize2, Terminal, ZoomIn, RefreshCw, AlertTriangle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatService } from '@/lib/chat';
interface LiveEmulatorProps {
  agent: AgentConfig;
}
export function LiveEmulator({ agent }: LiveEmulatorProps) {
  const [zoom, setZoom] = useState(100);
  const [showDevTools, setShowDevTools] = useState(false);
  const [viewMode, setViewMode] = useState<'standard' | 'embed'>('standard');
  const [error, setError] = useState<string | null>(null);
  const resetNeuralLink = async () => {
    setError(null);
    await chatService.clearMessages();
    window.location.reload();
  };
  const deploymentUrl = chatService.generateDeploymentUrl(agent.id);
  return (
    <div className="flex flex-col h-full bg-black overflow-hidden relative">
      {/* Emulator Toolbar */}
      <header className="h-12 border-b border-primary/10 px-4 flex items-center justify-between bg-zinc-950/90 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-white/5">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("h-7 w-7 rounded-md transition-all", viewMode === 'standard' ? "bg-primary text-black" : "text-zinc-500 hover:text-primary")}
                    onClick={() => setViewMode('standard')}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("h-7 w-7 rounded-md transition-all", viewMode === 'embed' ? "bg-primary text-black" : "text-zinc-500 hover:text-primary")}
                    onClick={() => setViewMode('embed')}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-900 border-primary/20 text-white text-[10px]">Viewport Strategy</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="h-4 w-[1px] bg-white/10 mx-1" />
          <div className="flex items-center gap-2">
            <ZoomIn className="h-3.5 w-3.5 text-zinc-500" />
            <Slider 
              value={[zoom]} 
              onValueChange={([v]) => setZoom(v)} 
              min={50} 
              max={150} 
              step={10} 
              className="w-24 [&_[role=slider]]:bg-primary h-4" 
            />
            <span className="text-[10px] font-mono text-zinc-500 w-8">{zoom}%</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="hidden lg:flex border-primary/20 text-primary text-[9px] font-mono gap-1.5 bg-primary/5">
            <RefreshCw className="h-2.5 w-2.5 animate-spin-slow" />
            LIVE SYNC ACTIVE
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-8 px-3 rounded-lg border border-white/5 text-[10px] font-bold uppercase tracking-widest transition-all", showDevTools ? "bg-primary/20 text-primary border-primary/40" : "text-zinc-500 hover:text-primary")}
            onClick={() => setShowDevTools(!showDevTools)}
          >
            <Terminal className="h-3.5 w-3.5 mr-1.5" />
            DevTools
          </Button>
        </div>
      </header>
      {/* Main Preview Workspace */}
      <div className="flex-1 overflow-hidden flex flex-col items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black">
        <div 
          className={cn(
            "transition-all duration-500 ease-out shadow-2xl relative",
            viewMode === 'embed' ? "w-[380px] h-[660px] rounded-[3rem] border-8 border-zinc-900" : "w-full h-full rounded-2xl border border-white/5",
            "bg-black overflow-hidden flex flex-col"
          )}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
        >
          {viewMode === 'embed' && (
            <div className="absolute top-0 left-0 w-full h-12 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-1 bg-zinc-800 rounded-full" />
            </div>
          )}
          <div className="flex-1 flex flex-col min-h-0">
             <ChatPreview agent={agent} />
          </div>
          {viewMode === 'embed' && (
             <footer className="p-4 text-center border-t border-white/5 bg-zinc-950">
                <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-40">Powered by Vox0-ki Core</p>
             </footer>
          )}
          {/* Error Overlay */}
          {error && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-500 mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Neural Protocol Error</h3>
              <p className="text-zinc-500 text-sm max-w-xs mb-8">{error}</p>
              <div className="flex flex-col gap-3 w-full max-w-[200px]">
                <Button onClick={resetNeuralLink} className="btn-gradient w-full py-6 rounded-xl font-bold">
                  Neural Reset
                </Button>
                <Button variant="ghost" onClick={() => setError(null)} className="text-zinc-600 hover:text-white">
                  Dismiss
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* External Preview Link */}
      <div className="absolute bottom-6 right-6 z-10 hidden sm:block">
        <Button variant="outline" size="sm" className="bg-zinc-950/80 backdrop-blur-md border-white/10 text-zinc-500 hover:text-primary rounded-xl h-10 px-4 text-[10px] font-bold uppercase tracking-widest shadow-xl" asChild>
          <a href={deploymentUrl} target="_blank" rel="noreferrer">
            <ExternalLink className="h-3 w-3 mr-2" />
            Open Live Unit
          </a>
        </Button>
      </div>
      {/* DevTools Drawer */}
      <NeuralDevTools open={showDevTools} agent={agent} onClose={() => setShowDevTools(false)} />
    </div>
  );
}