import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Key, Eye, Trash2, RefreshCw, Plus, Lock } from 'lucide-react';
import { toast } from 'sonner';
const SECRETS = [
  { id: 's-1', name: 'OPENAI_API_KEY', value: 'sk-proj-••••••••••••••••3a9c', lastRotated: '2 days ago' },
  { id: 's-2', name: 'SERP_API_KEY', value: '7c8d••••••••••••••••1f4b', lastRotated: '1 month ago' },
  { id: 's-3', name: 'D1_DATABASE_TOKEN', value: 'v0-ki-••••••••••••••••z2x9', lastRotated: '1 week ago' },
];
export function VaultPage() {
  return (
    <AppLayout container className="bg-black">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest">
              <Shield className="w-3 h-3" /> Sovereign Security
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Security <span className="text-gradient">Vault</span></h1>
            <p className="text-zinc-500 max-w-2xl">Manage your encrypted environment variables and access protocols across the Vox0-ki network.</p>
          </div>
          <Button className="btn-gradient px-8 py-7 rounded-2xl shadow-glow">
            <Plus className="w-5 h-5 mr-2" /> Inject Secret
          </Button>
        </header>
        <div className="grid gap-6">
          {SECRETS.map((s) => (
            <Card key={s.id} className="border-primary/10 bg-zinc-950/40 backdrop-blur-md hover:border-primary/20 transition-all">
              <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-primary border border-white/5 shadow-inner">
                  <Key className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-white text-lg">{s.name}</h3>
                    <Badge variant="outline" className="text-[9px] border-primary/10 text-zinc-500 font-mono">ENCRYPTED_AES_256</Badge>
                  </div>
                  <div className="font-mono text-zinc-600 text-sm tracking-widest">{s.value}</div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Button variant="ghost" size="icon" className="hover:bg-zinc-900 rounded-xl" onClick={() => toast.info('Key revealed')}>
                    <Eye className="w-4 h-4 text-zinc-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-zinc-900 rounded-xl" onClick={() => toast.success('Rotation scheduled')}>
                    <RefreshCw className="w-4 h-4 text-zinc-500" />
                  </Button>
                  <div className="h-8 w-[1px] bg-white/5 hidden md:block" />
                  <Button variant="ghost" size="icon" className="hover:bg-red-500/10 hover:text-red-500 rounded-xl">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="mt-8 p-10 rounded-[2.5rem] border border-dashed border-primary/10 bg-zinc-950/20 text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center mx-auto border border-white/5 text-zinc-700">
               <Lock className="w-8 h-8" />
             </div>
             <p className="text-zinc-500 font-medium">Add more secrets to your high-availability cluster.</p>
             <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest">End-to-End Encryption Enabled</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}