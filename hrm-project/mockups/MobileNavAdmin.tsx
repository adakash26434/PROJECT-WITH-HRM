import * as React from "react";
import {
  Menu, X, Bell, Search, Shield, ChevronRight, ChevronDown,
  LayoutDashboard, Users, FileText, BarChart2, Settings,
  UserCog, Briefcase, Lock, Database, RefreshCw,
  AlertTriangle, CheckCircle2, LogOut, ArrowUpRight,
} from "lucide-react";

/* ─── gradient helpers (follow CSS vars) ───────────── */
const PRIMARY_GRADIENT =
  "linear-gradient(135deg,hsl(var(--primary)) 0%,color-mix(in oklch, hsl(var(--primary)), white 35%) 100%)";
const ADMIN_DRAWER_GRADIENT =
  "linear-gradient(135deg,hsl(var(--primary)) 0%,color-mix(in oklch, hsl(var(--primary)), black 25%) 100%)";
const DESTRUCTIVE_GRADIENT =
  "linear-gradient(135deg,hsl(var(--destructive)) 0%,color-mix(in oklch, hsl(var(--destructive)), black 20%) 100%)";
const TOP_ACCENT_GRADIENT =
  "linear-gradient(90deg,hsl(var(--destructive)) 0%,hsl(var(--destructive)/0.6) 50%,hsl(var(--primary)) 100%)";

/* ─── data ─────────────────────────────────────────── */
const NAV_GROUPS = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    items: [],
    badge: 0,
  },
  {
    id: "members",
    icon: Users,
    label: "Members",
    badge: 0,
    items: [
      { label: "All Members",        badge: 0 },
      { label: "Pending Approvals",  badge: 3 },
      { label: "Suspended Accounts", badge: 0 },
      { label: "Expiring Soon",      badge: 12 },
    ],
  },
  {
    id: "loans",
    icon: Briefcase,
    label: "Loans",
    badge: 7,
    items: [
      { label: "Active Loans",      badge: 0 },
      { label: "Applications",      badge: 7 },
      { label: "Overdue",           badge: 0 },
      { label: "Closed Loans",      badge: 0 },
    ],
  },
  {
    id: "reports",
    icon: BarChart2,
    label: "Reports",
    badge: 0,
    items: [
      { label: "Monthly Report",   badge: 0 },
      { label: "Audit Trail",      badge: 0 },
      { label: "Export Data",      badge: 0 },
    ],
  },
  {
    id: "hrm",
    icon: UserCog,
    label: "HRM",
    badge: 0,
    items: [
      { label: "Staff List",      badge: 0 },
      { label: "Attendance",      badge: 0 },
      { label: "Leave Requests",  badge: 2 },
    ],
  },
  {
    id: "content",
    icon: FileText,
    label: "Content",
    badge: 0,
    items: [
      { label: "Notices",        badge: 0 },
      { label: "Downloads",      badge: 0 },
      { label: "Announcements",  badge: 0 },
    ],
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    badge: 0,
    items: [
      { label: "General",        badge: 0 },
      { label: "Roles & Access", badge: 0 },
      { label: "Security",       badge: 0 },
      { label: "Integrations",   badge: 0 },
    ],
  },
];

const QUICK_ACTIONS = [
  { icon: BarChart2,   label: "Reports" },
  { icon: Users,       label: "Members" },
  { icon: Database,    label: "Backup" },
  { icon: Lock,        label: "Security" },
];

const ALERTS = [
  { icon: AlertTriangle, msg: "3 pending approvals",  color: "text-portal-warning",  bg: "bg-portal-warning/10" },
  { icon: CheckCircle2,  msg: "Backup complete",       color: "text-portal-success",  bg: "bg-portal-success/10" },
  { icon: AlertTriangle, msg: "7 loan apps waiting",  color: "text-portal-danger",   bg: "bg-portal-danger/10" },
];

/* ─── sub-components ─────────────────────────────── */
function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1">
      <span className={`text-[11px] font-semibold ${light ? "text-white/90" : "text-foreground"}`}>9:41</span>
      <div className="flex items-center gap-1">
        {[4, 3, 2].map(h => (
          <div key={h} className={`w-1 rounded-sm ${light ? "bg-white" : "bg-foreground"}`} style={{ height: h * 3 }} />
        ))}
        <div className={`ml-1 w-5 h-2.5 rounded-sm border relative ${light ? "border-white" : "border-foreground"}`}>
          <div className={`absolute inset-0.5 right-1 rounded-[1px] ${light ? "bg-white" : "bg-foreground"}`} />
          <div className={`absolute right-[-3px] top-0.5 w-0.5 h-1.5 rounded-r-sm ${light ? "bg-white" : "bg-foreground"}`} />
        </div>
      </div>
    </div>
  );
}

/* ─── main ──────────────────────────────────────────── */
export default function MobileNavAdmin() {
  const [drawerOpen,     setDrawerOpen]     = React.useState(false);
  const [activeGroup,    setActiveGroup]    = React.useState("dashboard");
  const [expandedGroups, setExpandedGroups] = React.useState<string[]>(["members"]);
  const [searchOpen,     setSearchOpen]     = React.useState(false);
  const [notifOpen,      setNotifOpen]      = React.useState(false);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const selectItem = (groupId: string) => {
    setActiveGroup(groupId);
    setDrawerOpen(false);
  };

  const totalBadge = NAV_GROUPS.reduce((sum, g) => sum + g.badge, 0);

  return (
    <div className="w-[390px] h-[780px] bg-background flex flex-col overflow-hidden rounded-[44px] shadow-2xl border border-border relative select-none"
      style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>

      {/* ── TOP HEADER ── */}
      <div className="bg-card border-b border-border flex-shrink-0">
        <div className="h-1 w-full" style={{ background: TOP_ACCENT_GRADIENT }} />
        <StatusBar />
        <div className="flex items-center gap-2 px-4 pb-3 pt-1">
          <button onClick={() => setDrawerOpen(true)}
            className="relative w-10 h-10 rounded-2xl bg-muted flex items-center justify-center active:bg-muted/70 transition-colors flex-shrink-0">
            <Menu className="h-5 w-5 text-foreground" />
            {totalBadge > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                {totalBadge}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-0 ml-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: PRIMARY_GRADIENT }}>
              <span className="text-white font-black text-xs">C</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-foreground leading-none">Coop</span>
                <span className="bg-destructive text-destructive-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide leading-none">
                  Admin
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">Control Panel</p>
            </div>
          </div>

          <button onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground active:bg-muted/70 transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <button onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground active:bg-muted/70 transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 relative"
            style={{ background: DESTRUCTIVE_GRADIENT }}>
            SA
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-portal-highlight border-2 border-card rounded-full flex items-center justify-center">
              <Shield className="h-1.5 w-1.5 text-white" />
            </span>
          </div>
        </div>

        {searchOpen && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 bg-muted rounded-2xl px-3 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input autoFocus placeholder="Search members, reports…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
              <button onClick={() => setSearchOpen(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Alert pills */}
        <div className="flex gap-2 px-4 pt-4 pb-1 overflow-x-auto scrollbar-hide">
          {ALERTS.map(a => (
            <div key={a.msg} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium whitespace-nowrap flex-shrink-0 ${a.bg}`}>
              <a.icon className={`h-3 w-3 ${a.color}`} />
              <span className="text-foreground">{a.msg}</span>
            </div>
          ))}
        </div>

        {/* Stat cards row */}
        <div className="flex gap-3 px-4 pt-4 overflow-x-auto scrollbar-hide pb-1">
          {[
            { label: "Total Members", value: "4,821", color: "text-portal-info",    bg: "bg-portal-info/10" },
            { label: "Active Loans",  value: "284",   color: "text-portal-success", bg: "bg-portal-success/10" },
            { label: "Pending",       value: "47",    color: "text-portal-warning", bg: "bg-portal-warning/10" },
            { label: "Revenue",       value: "₹2.4Cr",color: "text-portal-data",   bg: "bg-portal-data/10" },
          ].map(s => (
            <div key={s.label} className="flex-shrink-0 bg-card border border-border rounded-2xl p-3 w-[120px]">
              <p className="text-[10px] text-muted-foreground mb-1">{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quick actions grid */}
        <div className="px-4 mt-5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</p>
          <div className="grid grid-cols-4 gap-2">
            {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
              <button key={label}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-card border border-border active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-[10px] text-foreground font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="px-4 mt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Activity</p>
            <button className="flex items-center gap-1 text-xs text-primary font-medium">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          {[
            { label: "New member registered", sub: "Sita Rai · 5m ago",         dot: "bg-portal-info" },
            { label: "Loan approved",          sub: "Ram Thapa · ₹50,000",       dot: "bg-portal-success" },
            { label: "Report generated",       sub: "May 2026 Monthly · 1h ago", dot: "bg-portal-data" },
            { label: "3 pending approvals",    sub: "Action required",           dot: "bg-portal-warning" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>

        <div className="px-4 mt-4">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-border bg-card text-sm text-muted-foreground font-medium">
            <RefreshCw className="h-4 w-4" /> Refresh Data
          </button>
        </div>
      </div>

      {/* ── NOTIFICATION PANEL ── */}
      {notifOpen && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-30 flex flex-col justify-start pt-20 px-4"
          onClick={() => setNotifOpen(false)}>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="font-semibold text-foreground text-sm">Admin Notifications</p>
              <button onClick={() => setNotifOpen(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            {[
              { title: "New Member Registration",  time: "5m ago",  dot: "bg-portal-info" },
              { title: "7 Loan Apps Pending",      time: "1h ago",  dot: "bg-portal-warning" },
              { title: "Monthly Backup Complete",  time: "6h ago",  dot: "bg-portal-success" },
              { title: "Security Alert: Login",    time: "1d ago",  dot: "bg-destructive" },
            ].map(n => (
              <div key={n.title} className="flex items-center gap-3 px-4 py-3 border-b border-border/50 last:border-0">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${n.dot}`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FULL SLIDE-IN DRAWER ── */}
      {drawerOpen && (
        <div className="absolute inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={() => setDrawerOpen(false)} />

          <div className="relative w-[82%] max-w-[320px] bg-card h-full flex flex-col shadow-2xl">
            {/* Drawer header */}
            <div className="flex-shrink-0" style={{ background: ADMIN_DRAWER_GRADIENT }}>
              <StatusBar light />
              <div className="px-4 pb-5 pt-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-base font-bold relative"
                      style={{ background: "rgba(255,255,255,0.2)" }}>
                      SA
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-portal-highlight border-2 border-white rounded-full flex items-center justify-center">
                        <Shield className="h-2 w-2 text-white" />
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Super Admin</p>
                      <p className="text-white/70 text-xs">admin@coop.org.np</p>
                      <span className="inline-block mt-1 bg-white/20 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-md uppercase tracking-wide">
                        Full Access
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setDrawerOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mt-1">
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto py-2">
              {NAV_GROUPS.map(group => {
                const Icon = group.icon;
                const isActive = activeGroup === group.id;
                const isExpanded = expandedGroups.includes(group.id);
                const hasChildren = group.items.length > 0;

                return (
                  <div key={group.id}>
                    <button
                      onClick={() => hasChildren ? toggleGroup(group.id) : selectItem(group.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors ${
                        isActive && !hasChildren ? "bg-primary/10 border-r-2 border-primary" : "hover:bg-muted active:bg-muted"
                      }`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive && !hasChildren ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      <span className={`flex-1 text-sm font-medium text-left transition-colors ${
                        isActive && !hasChildren ? "text-primary" : "text-foreground"
                      }`}>
                        {group.label}
                      </span>
                      {group.badge > 0 && (
                        <span className="min-w-[20px] h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center px-1.5">
                          {group.badge}
                        </span>
                      )}
                      {hasChildren && (
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                      )}
                    </button>

                    {hasChildren && isExpanded && (
                      <div className="bg-muted/40">
                        {group.items.map(item => {
                          const subId = `${group.id}.${item.label}`;
                          const subActive = activeGroup === subId;
                          return (
                            <button key={item.label}
                              onClick={() => selectItem(subId)}
                              className={`w-full flex items-center gap-3 pl-14 pr-4 py-3 transition-colors ${
                                subActive ? "bg-primary/10 border-r-2 border-primary" : "hover:bg-muted active:bg-muted"
                              }`}>
                              <span className={`flex-1 text-sm text-left ${subActive ? "text-primary font-semibold" : "text-foreground"}`}>
                                {item.label}
                              </span>
                              {item.badge > 0 && (
                                <span className="min-w-[18px] h-[18px] bg-portal-warning text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer footer */}
            <div className="flex-shrink-0 border-t border-border p-4 pb-8 space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted text-muted-foreground text-sm">
                <Settings className="h-4 w-4" />
                System Settings
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-destructive/10 text-destructive text-sm font-semibold">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
