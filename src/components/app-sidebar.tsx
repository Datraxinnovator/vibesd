import React from "react";
import { LayoutDashboard, Zap, Settings, LifeBuoy, BookOpen, Layers, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  return (
    <Sidebar className="border-r border-primary/10 bg-black">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-yellow-700 flex items-center justify-center text-black shadow-glow border border-primary/40">
            <Zap className="size-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">Vox0-ki</span>
            <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase -mt-1 opacity-80">Elite Workspace</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-600 font-bold uppercase tracking-widest text-[10px] px-4">Workspace</SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === '/dashboard'}
                className="rounded-xl h-11 data-[active=true]:bg-primary/10 data-[active=true]:text-primary transition-all group"
              >
                <Link to="/dashboard" className="flex items-center gap-3">
                  <LayoutDashboard className="size-5 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Command Center</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={location.pathname === '/gallery'}
                className="rounded-xl h-11 data-[active=true]:bg-primary/10 data-[active=true]:text-primary transition-all group"
              >
                <Link to="/gallery" className="flex items-center gap-3">
                  <Layers className="size-5" />
                  <span className="font-semibold">Blueprint Gallery</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator className="bg-primary/5 my-4 mx-4" />
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-600 font-bold uppercase tracking-widest text-[10px] px-4">Protocols</SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={location.pathname === '/vault'}
                className="rounded-xl h-11 data-[active=true]:bg-primary/10 data-[active=true]:text-primary transition-all group"
              >
                <Link to="/vault" className="flex items-center gap-3">
                  <Shield className="size-5" />
                  <span className="font-semibold">Security Vault</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={location.pathname === '/tuning'}
                className="rounded-xl h-11 data-[active=true]:bg-primary/10 data-[active=true]:text-primary transition-all group"
              >
                <Link to="/tuning" className="flex items-center gap-3">
                  <Settings className="size-5" />
                  <span className="font-semibold">System Tuning</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={location.pathname === '/docs'}
                className="rounded-xl h-11 data-[active=true]:bg-primary/10 data-[active=true]:text-primary transition-all group"
              >
                <Link to="/docs" className="flex items-center gap-3">
                  <BookOpen className="size-5" />
                  <span className="font-semibold">Tech Manual</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-6 border-t border-primary/5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname === '/support'}
              className="h-10 data-[active=true]:bg-primary/10 data-[active=true]:text-primary rounded-xl"
            >
              <Link to="/support" className="flex items-center gap-3">
                <LifeBuoy className="size-4" /> <span className="text-sm font-medium">Concierge Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-6 flex items-center justify-between px-2">
          <div className="text-[10px] text-zinc-700 uppercase font-black tracking-widest">
            VOX.OS V1.0.4 PRO
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}