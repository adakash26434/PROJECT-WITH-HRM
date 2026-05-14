import * as React from "react";
import {
  Home, LayoutDashboard, Layers, MessageSquare, User,
  Bell, Search, ChevronRight, ChevronDown, X,
  HelpCircle, Settings, LogOut, FileText, CreditCard,
  TrendingUp, Shield, Star, ArrowRight, Menu,
} from "lucide-react";

/* ─── data ─────────────────────────────────────────── */
const BOTTOM_TABS = [
  { id: "home",      icon: Home,            label: "Home",      badge: 0 },
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", badge: 0 },
  { id: "services",  icon: Layers,          label: "Services",  badge: 0 },
  { id: "messages",  icon: MessageSquare,   label: "Messages",  badge: 3 },
  { id: "menu",      icon: Menu,            label: "More",      badge: 0 },
];

const MENU_SECTIONS = [
  {
    title: "My Account",
    items: [
      { icon: User,        label: "My Profile",       sub: "Personal & contact info" },
      { icon: TrendingUp,  label: "Savings Overview",  sub: "Balance & statements" },
      { icon: CreditCard,  label: "Loan Details",      sub: "Active loans & history" },
      { icon: FileText,    label: "Documents",         sub: "Certificates & letters" },
    ],
  },
  {
    title: "Services",
    items: [
      { icon: Star,        label: "Apply for Loan",    sub: "New application" },
      { icon: Shield,      label: "Fixed Deposit",     sub: "Rates & booking" },
      { icon: TrendingUp,  label: "Share Capital",     sub: "View holdings" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle,  label: "Help & FAQ",        sub: "Common questions" },
      { icon: Settings,    label: "Settings",          sub: "Preferences & security" },
    ],
  },
];

/* ─── gradient helper (follows --primary CSS var) ──── */
const PRIMARY_GRADIENT =
  "linear-gradient(135deg,hsl(var(--primary)) 0%,color-mix(in oklch, hsl(var(--primary)), white 35%) 100%)";

/* ─── sub-components ────────────────────────────────── */
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1">
      <span className="text-[11px] font-semibold text-foreground">9:41</span>
      <div className="flex items-center gap-1">
        {[4,3,2].map(h => (
          <div key={h} className="w-1 rounded-sm bg-foreground" style={{ height: h * 3 }} />
        ))}
        <div className="ml-1 w-5 h-2.5 rounded-sm border border-foreground relative">
          <div className="absolute inset-0.5 right-1 bg-foreground rounded-[1px]" />
          <div className="absolute right-[-3px] top-0.5 w-0.5 h-1.5 bg-foreground rounded-r-sm" />
        </div>
      </div>
    </div>
  );
}

function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" }) {
  const s = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return (
    <div className={`${s} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ background: PRIMARY_GRADIENT }}>
      {initials}
    </div>
  );
}

/* ─── main ──────────────────────────────────────────── */
export default function MobileNavMember() {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [menuOpen,  setMenuOpen]  = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [notifOpen,  setNotifOpen]  = React.useState(false);
  const [expandedSection, setExpandedSection] = React.useState<string | null>("My Account");

  const handleTab = (id: string) => {
    if (id === "menu") { setMenuOpen(true); return; }
    setActiveTab(id);
  };

  return (
    <div className="w-[390px] h-[780px] bg-background flex flex-col overflow-hidden rounded-[44px] shadow-2xl border border-border relative select-none"
      style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>

      {/* STATUS BAR */}
      <div className="bg-card">
        <StatusBar />

        {/* TOP APP BAR */}
        <div className="flex items-center gap-3 px-4 pb-3 pt-1">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: PRIMARY_GRADIENT }}>
              <span className="text-white font-black text-sm">C</span>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground leading-none">Namaste 👋</p>
              <p className="text-sm font-bold text-foreground leading-snug truncate">Ram Bahadur</p>
            </div>
          </div>
          <button onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground active:bg-muted/70 transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <button onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground active:bg-muted/70 transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card" />
          </button>
        </div>

        {searchOpen && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 bg-muted rounded-2xl px-3 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input autoFocus placeholder="Search services, loans…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
              <button onClick={() => setSearchOpen(false)}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MAIN CONTENT SCROLL */}
      <div className="flex-1 overflow-y-auto">
        {/* Balance card */}
        <div className="mx-4 mt-4 rounded-2xl p-4 text-white relative overflow-hidden"
          style={{ background: PRIMARY_GRADIENT }}>
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -right-2 -bottom-8 w-24 h-24 rounded-full bg-white/5" />
          <p className="text-xs text-white/70 mb-1">Total Savings Balance</p>
          <p className="text-2xl font-bold mb-3">₹ 1,24,500.00</p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[10px] text-white/70">Member Since</p>
              <p className="text-xs font-semibold">Jan 2019</p>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-white/70">Member #</p>
              <p className="text-xs font-semibold">M-1042</p>
            </div>
            <button className="flex items-center gap-1 bg-white/20 rounded-lg px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              Statement <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-4 mt-5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: CreditCard, label: "Apply\nLoan",      color: "bg-portal-info/10 text-portal-info" },
              { icon: TrendingUp, label: "Fixed\nDeposit",   color: "bg-portal-success/10 text-portal-success" },
              { icon: FileText,   label: "My\nStatement",    color: "bg-portal-data/10 text-portal-data" },
              { icon: Star,       label: "Share\nCapital",   color: "bg-portal-warning/10 text-portal-warning" },
            ].map(({ icon: Icon, label, color }) => (
              <button key={label}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-card border border-border active:scale-95 transition-transform">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-foreground font-medium text-center leading-tight whitespace-pre-line">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="px-4 mt-5 pb-24">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Activity</p>
            <button className="text-xs text-primary font-medium">See all</button>
          </div>
          {[
            { label: "Loan EMI Deducted", date: "May 12", amount: "– ₹4,500", color: "text-destructive" },
            { label: "Savings Credit",    date: "May 10", amount: "+ ₹2,000", color: "text-portal-success" },
            { label: "Dividend Received", date: "May 5",  amount: "+ ₹850",   color: "text-portal-success" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <p className={`text-sm font-semibold ${item.color}`}>{item.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM TAB BAR */}
      <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border pb-5 pt-2 px-2 rounded-b-[44px]">
        <div className="flex items-center justify-around">
          {BOTTOM_TABS.map(({ id, icon: Icon, label, badge }) => {
            const isActive = activeTab === id && id !== "menu";
            return (
              <button key={id} onClick={() => handleTab(id)}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5 min-w-[60px] active:scale-95 transition-transform">
                <div className={`relative w-10 h-8 rounded-2xl flex items-center justify-center transition-colors ${
                  isActive ? "bg-primary/15" : ""
                }`}>
                  <Icon className={`h-5 w-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  {badge > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                      {badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* NOTIFICATION PANEL */}
      {notifOpen && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-30 flex flex-col justify-start pt-20 px-4"
          onClick={() => setNotifOpen(false)}>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="font-semibold text-foreground text-sm">Notifications</p>
              <button onClick={() => setNotifOpen(false)}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            {[
              { title: "EMI Due Tomorrow",    time: "2h ago", dot: "bg-destructive" },
              { title: "Dividend Credited",   time: "1d ago", dot: "bg-portal-success" },
              { title: "Annual Report Ready", time: "3d ago", dot: "bg-portal-info" },
            ].map(n => (
              <div key={n.title} className="flex items-center gap-3 px-4 py-3 border-b border-border/50 last:border-0">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${n.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SLIDE-UP MENU SHEET */}
      {menuOpen && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setMenuOpen(false)} />
          <div className="relative bg-card rounded-t-[28px] max-h-[85%] flex flex-col shadow-2xl">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between px-5 pb-3 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar initials="RB" />
                <div>
                  <p className="text-sm font-bold text-foreground">Ram Bahadur</p>
                  <p className="text-xs text-muted-foreground">Member #1042 · Active</p>
                </div>
              </div>
              <button onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 py-2">
              {MENU_SECTIONS.map(section => (
                <div key={section.title}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                    className="w-full flex items-center justify-between px-5 py-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</p>
                    <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                      expandedSection === section.title ? "rotate-180" : ""
                    }`} />
                  </button>
                  {expandedSection === section.title && (
                    <div className="pb-2">
                      {section.items.map(item => (
                        <button key={item.label}
                          className="w-full flex items-center gap-3 px-5 py-3 hover:bg-muted active:bg-muted transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                            <item.icon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.sub}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t border-border p-4 pb-8">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-destructive/10 text-destructive text-sm font-semibold">
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
