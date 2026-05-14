import * as React from "react";
import {
  Bell,
  Search,
  Home,
  LayoutDashboard,
  Layers,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  Settings,
  LogOut,
  User,
  X,
  Menu,
} from "lucide-react";

const NAV_LINKS = [
  { icon: Home, label: "Home", active: false },
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Layers, label: "Services", active: false },
  { icon: MessageSquare, label: "Messages", badge: 3, active: false },
  { icon: HelpCircle, label: "Support", active: false },
];

function Avatar() {
  return (
    <div className="relative flex-shrink-0">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(221 83% 53%) 100%)" }}
      >
        RB
      </div>
      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
    </div>
  );
}

export default function MemberPortalHeader() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-sm">
        {/* Main header row */}
        <div className="flex items-center gap-3 px-5 h-16">

          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0 mr-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(221 83% 53%) 100%)" }}
            >
              <span className="text-white font-black text-sm">C</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-foreground text-[15px] leading-tight">Coop</span>
              <span className="text-[10px] text-muted-foreground block leading-tight -mt-0.5 tracking-wide uppercase">Member Portal</span>
            </div>
          </div>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map(({ icon: Icon, label, badge, active }) => (
              <button
                key={label}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">

            {/* Search — desktop */}
            <div className="hidden md:flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-2 w-48 text-sm text-muted-foreground hover:border-ring cursor-text transition-colors">
              <Search className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Search…</span>
              <kbd className="ml-auto text-[10px] bg-background border border-border rounded px-1">⌘K</kbd>
            </div>

            {/* Search — mobile */}
            <button
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <Avatar />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-foreground leading-tight">Ram Bahadur</p>
                  <p className="text-[11px] text-muted-foreground leading-tight">Member #1042</p>
                </div>
                <ChevronDown className={`hidden lg:block h-3.5 w-3.5 text-muted-foreground transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-52 bg-card border border-border rounded-xl shadow-lg py-1 z-50">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="text-sm font-semibold text-foreground">Ram Bahadur</p>
                    <p className="text-xs text-muted-foreground">ram@example.com</p>
                  </div>
                  {[
                    { icon: User, label: "My Profile" },
                    { icon: Settings, label: "Settings" },
                    { icon: HelpCircle, label: "Help & Support" },
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

            {/* Hamburger — mobile */}
            <button
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <div className="flex items-center gap-2 bg-muted border border-ring rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input autoFocus className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" placeholder="Search…" />
            </div>
          </div>
        )}

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-border">
            {NAV_LINKS.map(({ icon: Icon, label, badge, active }) => (
              <button
                key={label}
                className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
                  active ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {badge && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full px-1.5 py-0.5">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Page preview */}
      <div className="p-8 flex flex-col gap-3 opacity-30 pointer-events-none select-none">
        <div className="h-6 bg-foreground/10 rounded w-48" />
        <div className="h-4 bg-foreground/10 rounded w-80" />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-foreground/5 border border-border rounded-xl" />)}
        </div>
      </div>
    </div>
  );
}
