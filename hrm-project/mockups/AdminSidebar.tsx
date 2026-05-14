import * as React from "react";
import {
  LayoutDashboard, Users, Briefcase, BarChart2, UserCog,
  FileText, Settings, ChevronDown, ChevronRight, LogOut,
  PanelLeftClose, PanelLeftOpen, Shield, TrendingUp,
  Bell, Search, RefreshCw, Database, Lock, Globe,
  UserCheck, UserX, Clock, AlertTriangle, DollarSign,
  BookOpen, Download, Megaphone, Eye, Star,
} from "lucide-react";

/* ─── types ────────────────────────────────────────── */
type Role = "super_admin" | "admin" | "manager" | "viewer";

interface NavItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  badge?: number;
  badgeColor?: string;
  roles: Role[];
}

interface NavGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  roles: Role[];
  items: NavItem[];
}

/* ─── navigation data ─────────────────────────────── */
const NAV_GROUPS: NavGroup[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    roles: ["super_admin", "admin", "manager", "viewer"],
    items: [
      { id: "dashboard",  label: "Dashboard",  icon: LayoutDashboard, roles: ["super_admin", "admin", "manager", "viewer"] },
      { id: "analytics",  label: "Analytics",  icon: TrendingUp,      roles: ["super_admin", "admin", "manager"] },
    ],
  },
  {
    id: "members",
    label: "Members",
    icon: Users,
    roles: ["super_admin", "admin", "manager", "viewer"],
    items: [
      { id: "all-members",   label: "All Members",        icon: Users,    roles: ["super_admin","admin","manager","viewer"] },
      { id: "pending",       label: "Pending Approvals",  icon: Clock,    badge: 3,  badgeColor: "bg-amber-500",    roles: ["super_admin","admin","manager"] },
      { id: "suspended",     label: "Suspended",          icon: UserX,    roles: ["super_admin","admin"] },
      { id: "expiring",      label: "Expiring Soon",      icon: AlertTriangle, badge: 12, badgeColor: "bg-orange-500", roles: ["super_admin","admin","manager"] },
      { id: "verified",      label: "KYC Verified",       icon: UserCheck, roles: ["super_admin","admin"] },
    ],
  },
  {
    id: "loans",
    label: "Loans & Finance",
    icon: Briefcase,
    roles: ["super_admin", "admin", "manager"],
    items: [
      { id: "active-loans",  label: "Active Loans",   icon: Briefcase,   roles: ["super_admin","admin","manager"] },
      { id: "applications",  label: "Applications",   icon: FileText, badge: 7, badgeColor: "bg-destructive", roles: ["super_admin","admin","manager"] },
      { id: "overdue",       label: "Overdue",        icon: AlertTriangle, roles: ["super_admin","admin"] },
      { id: "transactions",  label: "Transactions",   icon: DollarSign, roles: ["super_admin","admin","manager"] },
      { id: "dividends",     label: "Dividends",      icon: Star,       roles: ["super_admin","admin"] },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart2,
    roles: ["super_admin", "admin", "manager"],
    items: [
      { id: "monthly",   label: "Monthly Report", icon: BarChart2, roles: ["super_admin","admin","manager"] },
      { id: "audit",     label: "Audit Trail",    icon: BookOpen,  roles: ["super_admin","admin"] },
      { id: "export",    label: "Export Data",    icon: Download,  roles: ["super_admin","admin","manager"] },
    ],
  },
  {
    id: "hrm",
    label: "HRM",
    icon: UserCog,
    roles: ["super_admin", "admin"],
    items: [
      { id: "staff",     label: "Staff List",     icon: Users,     roles: ["super_admin","admin"] },
      { id: "attendance",label: "Attendance",     icon: Clock,     roles: ["super_admin","admin"] },
      { id: "leave",     label: "Leave Requests", icon: FileText,  badge: 2, badgeColor: "bg-blue-500", roles: ["super_admin","admin"] },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: Globe,
    roles: ["super_admin", "admin", "manager"],
    items: [
      { id: "notices",        label: "Notices",        icon: Megaphone, roles: ["super_admin","admin","manager"] },
      { id: "downloads",      label: "Downloads",      icon: Download,  roles: ["super_admin","admin","manager"] },
      { id: "announcements",  label: "Announcements",  icon: Bell,      roles: ["super_admin","admin"] },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    roles: ["super_admin", "admin"],
    items: [
      { id: "general",    label: "General",          icon: Settings,  roles: ["super_admin","admin"] },
      { id: "roles",      label: "Roles & Access",   icon: Shield,    roles: ["super_admin"] },
      { id: "security",   label: "Security",         icon: Lock,      roles: ["super_admin"] },
      { id: "database",   label: "Database",         icon: Database,  roles: ["super_admin"] },
    ],
  },
];

const ROLES: { value: Role; label: string; color: string; bg: string }[] = [
  { value: "super_admin", label: "Super Admin", color: "text-destructive", bg: "bg-destructive/10" },
  { value: "admin",       label: "Admin",       color: "text-amber-600",  bg: "bg-amber-500/10" },
  { value: "manager",     label: "Manager",     color: "text-blue-600",   bg: "bg-blue-500/10" },
  { value: "viewer",      label: "Viewer",      color: "text-muted-foreground", bg: "bg-muted" },
];

const BREADCRUMBS: Record<string, string[]> = {
  dashboard:    ["Admin", "Dashboard"],
  analytics:    ["Admin", "Analytics"],
  "all-members":["Admin", "Members", "All Members"],
  pending:      ["Admin", "Members", "Pending Approvals"],
  suspended:    ["Admin", "Members", "Suspended"],
  expiring:     ["Admin", "Members", "Expiring Soon"],
  verified:     ["Admin", "Members", "KYC Verified"],
  "active-loans":["Admin","Loans","Active Loans"],
  applications: ["Admin", "Loans", "Applications"],
  overdue:      ["Admin", "Loans", "Overdue"],
  transactions: ["Admin", "Loans", "Transactions"],
  dividends:    ["Admin", "Loans", "Dividends"],
  monthly:      ["Admin", "Reports", "Monthly"],
  audit:        ["Admin", "Reports", "Audit Trail"],
  export:       ["Admin", "Reports", "Export"],
  staff:        ["Admin", "HRM", "Staff List"],
  attendance:   ["Admin", "HRM", "Attendance"],
  leave:        ["Admin", "HRM", "Leave Requests"],
  notices:      ["Admin", "Content", "Notices"],
  downloads:    ["Admin", "Content", "Downloads"],
  announcements:["Admin", "Content", "Announcements"],
  general:      ["Admin", "Settings", "General"],
  roles:        ["Admin", "Settings", "Roles & Access"],
  security:     ["Admin", "Settings", "Security"],
  database:     ["Admin", "Settings", "Database"],
};

/* ─── helpers ─────────────────────────────────────── */
function getRoleConfig(role: Role) {
  return ROLES.find(r => r.value === role)!;
}

function canSee(item: { roles: Role[] }, role: Role) {
  return item.roles.includes(role);
}

/* ─── sidebar nav item ────────────────────────────── */
function SidebarItem({
  item, active, collapsed, onClick,
}: {
  item: NavItem; active: boolean; collapsed: boolean; onClick: () => void;
}) {
  const Icon = item.icon ?? ChevronRight;
  return (
    <button
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={`group w-full flex items-center gap-2.5 rounded-lg transition-all duration-150 ${
        collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2"
      } ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      <Icon className={`flex-shrink-0 transition-none ${collapsed ? "h-5 w-5" : "h-4 w-4"}`} />
      {!collapsed && (
        <>
          <span className="flex-1 text-sm font-medium text-left truncate">{item.label}</span>
          {item.badge ? (
            <span className={`min-w-[20px] h-5 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1.5 ${item.badgeColor ?? "bg-muted-foreground"}`}>
              {item.badge}
            </span>
          ) : null}
        </>
      )}
      {collapsed && item.badge ? (
        <span className={`absolute top-0 right-0 w-2.5 h-2.5 rounded-full ${item.badgeColor ?? "bg-destructive"}`} />
      ) : null}
    </button>
  );
}

/* ─── main component ──────────────────────────────── */
export default function AdminSidebar() {
  const [collapsed, setCollapsed]   = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("dashboard");
  const [role, setRole]             = React.useState<Role>("super_admin");
  const [expanded, setExpanded]     = React.useState<string[]>(["overview", "members"]);
  const [rolePickerOpen, setRolePickerOpen] = React.useState(false);

  const toggleGroup = (id: string) =>
    setExpanded(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

  const visibleGroups = NAV_GROUPS.filter(g => canSee(g, role));
  const breadcrumb    = BREADCRUMBS[activeItem] ?? ["Admin", "Dashboard"];
  const roleConfig    = getRoleConfig(role);

  const sidebarW = collapsed ? "w-[64px]" : "w-[240px]";

  return (
    <div className="flex h-[820px] bg-background overflow-hidden">

      {/* ══ SIDEBAR ══════════════════════════════════ */}
      <aside className={`${sidebarW} flex flex-col bg-card border-r border-border transition-all duration-200 ease-in-out flex-shrink-0`}>

        {/* Logo row */}
        <div className={`flex items-center border-b border-border h-14 flex-shrink-0 ${collapsed ? "justify-center px-0" : "px-4 gap-3"}`}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,hsl(var(--primary)) 0%,hsl(221 83% 53%) 100%)" }}>
            <span className="text-white font-black text-sm">C</span>
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="font-bold text-foreground text-[13px] leading-tight">Coop Nepal</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Admin Panel</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Collapsed: expand button */}
        {collapsed && (
          <div className="flex justify-center py-2 border-b border-border">
            <button
              onClick={() => setCollapsed(false)}
              className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Role badge (collapsed: dot only) */}
        {!collapsed && (
          <div className="px-3 py-2.5 border-b border-border relative">
            <button
              onClick={() => setRolePickerOpen(!rolePickerOpen)}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${roleConfig.bg} ${roleConfig.color}`}
            >
              <Shield className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="flex-1 text-left">{roleConfig.label}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${rolePickerOpen ? "rotate-180" : ""}`} />
            </button>
            {rolePickerOpen && (
              <div className="absolute left-3 right-3 top-full mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                {ROLES.map(r => (
                  <button
                    key={r.value}
                    onClick={() => { setRole(r.value); setRolePickerOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors hover:bg-muted ${r.color} ${role === r.value ? "bg-muted" : ""}`}
                  >
                    <Shield className="h-3 w-3" />
                    {r.label}
                    {role === r.value && <span className="ml-auto text-[9px] font-bold opacity-60">ACTIVE</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Nav scroll */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2 space-y-0.5">
          {visibleGroups.map(group => {
            const Icon = group.icon;
            const isExpanded = expanded.includes(group.id);
            const visibleItems = group.items.filter(i => canSee(i, role));
            const groupBadge = visibleItems.reduce((s, i) => s + (i.badge ?? 0), 0);
            const groupActive = visibleItems.some(i => i.id === activeItem);

            if (collapsed) {
              // Collapsed: icon only, active item's group highlighted
              return (
                <div key={group.id} className="relative">
                  <button
                    title={group.label}
                    onClick={() => { setCollapsed(false); setExpanded(prev => prev.includes(group.id) ? prev : [...prev, group.id]); }}
                    className={`w-full flex items-center justify-center p-2.5 rounded-lg transition-colors relative ${
                      groupActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {groupBadge > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </button>
                </div>
              );
            }

            return (
              <div key={group.id}>
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors group ${
                    groupActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 text-sm font-semibold text-left">{group.label}</span>
                  {groupBadge > 0 && (
                    <span className="min-w-[18px] h-[18px] bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                      {groupBadge}
                    </span>
                  )}
                  <ChevronDown className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {/* Group items */}
                {isExpanded && (
                  <div className="ml-3 pl-3 border-l border-border mt-0.5 mb-1 space-y-0.5">
                    {visibleItems.map(item => (
                      <SidebarItem
                        key={item.id}
                        item={item}
                        active={activeItem === item.id}
                        collapsed={false}
                        onClick={() => setActiveItem(item.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar footer: user profile */}
        <div className={`flex-shrink-0 border-t border-border p-3 ${collapsed ? "flex justify-center" : ""}`}>
          {collapsed ? (
            <button title="Super Admin" className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg,hsl(var(--destructive)) 0%,hsl(0 72% 50%) 100%)" }}>
              SA
            </button>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg,hsl(var(--destructive)) 0%,hsl(0 72% 50%) 100%)" }}>
                SA
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate leading-tight">Super Admin</p>
                <p className="text-[10px] text-muted-foreground truncate leading-tight">admin@coop.org.np</p>
              </div>
              <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex-shrink-0" title="Sign out">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ══ MAIN AREA ════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="h-14 bg-card border-b border-border flex items-center gap-3 px-5 flex-shrink-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm flex-1 min-w-0">
            {breadcrumb.map((crumb, i) => (
              <React.Fragment key={crumb}>
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />}
                <span className={`${i === breadcrumb.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground cursor-pointer"} truncate`}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-2 bg-muted border border-border rounded-lg px-2.5 py-1.5 w-40 text-xs text-muted-foreground hover:border-ring cursor-text transition-colors">
              <Search className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Search…</span>
              <kbd className="ml-auto text-[9px] bg-card border border-border rounded px-1">/</kbd>
            </div>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full" />
            </button>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
              style={{ background: "linear-gradient(135deg,hsl(var(--destructive)) 0%,hsl(0 72% 50%) 100%)" }}>
              SA
            </div>
          </div>
        </header>

        {/* Page content ghost */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page title */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="h-6 w-40 bg-foreground/10 rounded-md mb-2" />
              <div className="h-3.5 w-56 bg-foreground/6 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-24 bg-foreground/8 rounded-lg border border-border" />
              <div className="h-8 w-28 rounded-lg" style={{ background: "hsl(var(--primary)/0.15)" }} />
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { w: "w-16", color: "bg-blue-500/10"   },
              { w: "w-20", color: "bg-green-500/10"  },
              { w: "w-14", color: "bg-amber-500/10"  },
              { w: "w-18", color: "bg-purple-500/10" },
            ].map((c, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <div className={`h-8 w-8 ${c.color} rounded-lg mb-3`} />
                <div className="h-6 w-20 bg-foreground/10 rounded mb-1.5" />
                <div className={`h-3 ${c.w} bg-foreground/6 rounded`} />
              </div>
            ))}
          </div>

          {/* Table skeleton */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
              <div className="h-4 w-32 bg-foreground/10 rounded" />
              <div className="flex gap-2">
                <div className="h-7 w-20 bg-foreground/8 rounded-lg border border-border" />
                <div className="h-7 w-20 bg-foreground/8 rounded-lg border border-border" />
              </div>
            </div>
            {/* Table header */}
            <div className="grid grid-cols-5 px-5 py-2.5 bg-muted/50 border-b border-border gap-4">
              {["Name", "ID", "Status", "Date", "Action"].map(h => (
                <div key={h} className="h-3 bg-foreground/10 rounded w-3/4" />
              ))}
            </div>
            {/* Rows */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-5 px-5 py-3.5 border-b border-border/60 last:border-0 gap-4 items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-foreground/8 flex-shrink-0" />
                  <div className="h-3 bg-foreground/10 rounded flex-1" />
                </div>
                <div className="h-3 bg-foreground/8 rounded w-2/3" />
                <div className={`h-5 rounded-full w-16 ${
                  i % 3 === 0 ? "bg-green-500/15" : i % 3 === 1 ? "bg-amber-500/15" : "bg-destructive/10"
                }`} />
                <div className="h-3 bg-foreground/6 rounded w-3/4" />
                <div className="flex gap-1.5">
                  <div className="h-6 w-14 bg-foreground/8 rounded-md border border-border" />
                  <div className="h-6 w-6 bg-foreground/6 rounded-md border border-border" />
                </div>
              </div>
            ))}
          </div>

          {/* Role access note */}
          <div className={`mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm ${roleConfig.bg} border-border`}>
            <Eye className={`h-4 w-4 flex-shrink-0 ${roleConfig.color}`} />
            <span className="text-muted-foreground">
              Viewing as <span className={`font-semibold ${roleConfig.color}`}>{roleConfig.label}</span>
              {" "}— some menu items are hidden based on your access level.
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
