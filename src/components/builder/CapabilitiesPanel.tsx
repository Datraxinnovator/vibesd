import React from 'react';
import { AgentConfig, useAgentStore } from '@/lib/store';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search, CloudSun, Database, Code, Globe, Zap } from 'lucide-react';
interface ToolDef {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}
const AVAILABLE_TOOLS: ToolDef[] = [
  { id: 'web_search', name: 'Web Oracle', description: 'Advanced real-time web intelligence', icon: <Search className="w-4 h-4" /> },
  { id: 'get_weather', name: 'Meteo Stream', description: 'Precise global climate analytics', icon: <CloudSun className="w-4 h-4" /> },
  { id: 'd1_db', name: 'D1 Matrix', description: 'Hyper-fast SQL storage at the edge', icon: <Database className="w-4 h-4" /> },
  { id: 'mcp_server', name: 'MCP Bridge', description: 'Seamless external protocol integration', icon: <Globe className="w-4 h-4" /> },
];
interface CapabilitiesPanelProps {
  agent: AgentConfig;
}
export function CapabilitiesPanel({ agent }: CapabilitiesPanelProps) {
  const updateAgent = useAgentStore((s) => s.updateAgent);
  const toggleTool = (toolId: string) => {
    const currentTools = [...agent.tools];
    const index = currentTools.indexOf(toolId);
    if (index > -1) {
      currentTools.splice(index, 1);
    } else {
      currentTools.push(toolId);
    }
    updateAgent(agent.id, { tools: currentTools });
  };
  return (
    <div className="p-8 space-y-10">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
          <Zap className="w-3 h-3" /> Capability Core
        </div>
        <div className="space-y-4">
          {AVAILABLE_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                agent.tools.includes(tool.id)
                  ? 'bg-primary/10 border-primary/40 shadow-[0_0_15px_rgba(255,215,0,0.1)]'
                  : 'bg-zinc-950 border-primary/5 opacity-50 grayscale-[0.8]'
              }`}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                    agent.tools.includes(tool.id) 
                      ? 'bg-primary/20 text-primary border-primary/40' 
                      : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                  }`}>
                    {tool.icon}
                  </div>
                  <div>
                    <Label htmlFor={tool.id} className="font-bold text-white cursor-pointer group-hover:text-primary transition-colors">{tool.name}</Label>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-tighter font-bold">{tool.description}</p>
                  </div>
                </div>
                <Switch
                  id={tool.id}
                  checked={agent.tools.includes(tool.id)}
                  onCheckedChange={() => toggleTool(tool.id)}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-6 border-t border-primary/10">
        <div className="flex items-center gap-2 text-zinc-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6">
          <Code className="w-3 h-3" /> Custom Protocols
        </div>
        <div className="p-8 rounded-3xl border border-dashed border-primary/10 bg-zinc-950/40 text-center group cursor-not-allowed">
          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4 text-zinc-700 group-hover:text-primary/40 transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Enterprise API Connector</p>
          <p className="text-[10px] text-zinc-700 mt-1 uppercase font-bold tracking-tighter">Coming in Next Phase</p>
        </div>
      </div>
    </div>
  );
}