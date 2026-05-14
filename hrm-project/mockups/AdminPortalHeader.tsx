import * as React from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Settings,
  LogOut,
  Shield,
  Users,
  BarChart2,
  FileText,
  PanelLeftOpen,
  PanelLeftClose,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";

const BREADCRUMB = ["Admin", "Dashboard", "Overview"];

const ALERTS = [
  { icon: AlertTriangle, label: "3 pending approvals", color: "text-amber-500" },
  { icon: CheckCircle2, label: "Backup complete", color: "text-green-500" },
];

const QUICK_NAV = [
  { icon: BarChart2, label: "Reports" },
  { icon: Users, label: "Members" },
  { icon: FileText, label: "Content" },
  { icon: Shield, label: "Roles" },
];

function AdminAvatar() {
  return (
    <div className="relative flex-shrink-0">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: "linear-gradient(135deg, hsl(var(--destructive)) 0%, hsl(0 72% 50%) 100%)" }}
      >
        SA
      </div>
      <div className="absolute -bottom-1 -right-1 bg-amber-500 border-2 border-card rounded-full w-4 h-4 flex items-center justify-center">
        <Shield className="h-2 w-2 text-white" />
      </div>
    </div>
  );
}

function StatusPill({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border text-xs">
      <Icon className={`h-3 w-3 ${color}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

export default function AdminPortalHeader() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-40">

        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--destructive)) 0%, hsl(0 72% 50%) 60%, hsl(var(--primary)) 100%)" }}
        />

        {/* Main header row */}
        <div className="flex items-center gap-3 px-4 h-14">

          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
          </button>

          {/* Logo + admin badge */}
          <div className="flex items-center gap-2 flex-shrink-0 pr-4 border-r border-border">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(221 83% 53%) 100%)" }}
            >
              <span className="text-white font-black text-xs">C</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground text-[13px] leading-none">Coop</span>
                <span className="bg-destructive text-destructive-foreground text-[9px] font-bold px-1 py-0.5 rounded uppercase tracking-wide leading-none">
                  Admin
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">Control Panel</span>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="hidden sm:flex items-center gap-1 text-sm">
            {BREADCRUMB.map((crumb, i) => (
              <React.Fragment key={crumb}>
                {i > 0 && <ChevronDown className="h-3 w-3 text-muted-foreground -rotate-90" />}
                <span className={i === BREADCRUMB.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground cursor-pointer"}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>

          {/* Status pills */}
          <div className="hidden xl:flex items-center gap-2 ml-2">
            {ALERTS.map((a) => (
              <StatusPill key={a.label} icon={a.icon} label={a.label} color={a.color} />
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Quick nav pills */}
          <div className="hidden lg:flex items-center gap-1 border-r border-border pr-3 mr-1">
            {QUICK_NAV.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-muted border border-border rounded-lg px-2.5 py-1.5 w-44 text-xs text-muted-foreground hover:border-ring cursor-text transition-colors">
            <Search className="h-3.5 w-3.5 flex-shrink-0" />
            <span>Search admin…</span>
            <kbd className="ml-auto text-[9px] bg-background border border-border rounded px-1">/</kbd>
          </div>

          {/* Refresh */}
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              className="relative w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                7
              </span>
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-card border border-border rounded-xl shadow-lg z-50">
                <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
                  <span className="text-sm font-semibold text-foreground">Notifications</span>
                  <button onClick={() => setNotifOpen(false)}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
                </div>
                {[
                  { title: "New member registration", time: "2m ago", dot: "bg-blue-500" },
                  { title: "Report ready: May 2026", time: "1h ago", dot: "bg-green-500" },
                  { title: "3 accounts pending review", time: "3h ago", dot: "bg-amber-500" },
                  { title: "System backup completed", time: "6h ago", dot: "bg-muted-foreground" },
                ].map((n) => (
                  <div key={n.title} className="flex items-start gap-2.5 px-3 py-2.5 hover:bg-muted border-b border-border/50 last:border-0 cursor-pointer">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`} />
                    <div>
                      <p className="text-sm text-foreground leading-snug">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.time}</p>
                    </div>
                  </div>
                ))}
                <div className="px-3 py-2 text-center">
                  <button className="text-xs text-primary hover:underline">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Settings className="h-3.5 w-3.5" />
          </button>

          {/* Admin profile */}
          <div className="relative">
            <button
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-muted transition-colors"
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            >
              <AdminAvatar />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-foreground leading-tight">Super Admin</p>
                <p className="text-[10px] text-muted-foreground leading-tight">admin@coop.np</p>
              </div>
              <ChevronDown className={`hidden lg:block h-3 w-3 text-muted-foreground transition-transform ${profileOpen ? "rotate-180" : ""}`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-card border border-border rounded-xl shadow-lg py-1 z-50">
                <div className="px-3 py-2 border-b border-border mb-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="text-sm font-semibold text-foreground">Super Admin</p>
                    <span className="bg-destructive/15 text-destructive text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">SA</span>
                  </div>
                  <p className="text-xs text-muted-foreground">admin@coop.np</p>
                </div>
                {[
                  { icon: Shield, label: "Admin Profile" },
                  { icon: Settings, label: "Preferences" },
                ].map(({ icon: Icon, label }) => (
                  <button key={label} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {label}
                  </button>
                ))}
                <div className="border-t border-border mt-1 pt-1">
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Page preview ghost */}
      <div className="flex gap-0 opacity-20 pointer-events-none select-none">
        {/* Sidebar ghost */}
        {sidebarOpen && (
          <div className="w-52 h-64 bg-card border-r border-border p-4 flex flex-col gap-2 flex-shrink-0">
            {[80, 60, 70, 55, 65].map((w, i) => (
              <div key={i} className="h-8 bg-foreground/10 rounded-lg" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}
        <div className="flex-1 p-6 flex flex-col gap-3">
          <div className="h-6 bg-foreground/10 rounded w-48" />
          <div className="grid grid-cols-4 gap-3 mt-2">
            {[1,2,3,4].map(i => <div key={i} className="h-20 bg-foreground/5 border border-border rounded-xl" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
