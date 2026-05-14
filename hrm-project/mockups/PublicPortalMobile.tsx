import * as React from "react";
import {
  X, ChevronDown, ChevronRight, ArrowRight,
  Smartphone, FileText, CreditCard, PiggyBank,
  MapPin, Phone, Mail, Star, Shield, Clock,
  CheckCircle2, Sparkles, HelpCircle, Download,
  BookOpen, Megaphone, LogIn, UserPlus, Menu,
  Home, Wifi, Zap,
} from "lucide-react";

/* ─── gradient helpers (follow CSS vars) ───────────── */
const HERO_GRADIENT =
  "linear-gradient(160deg, hsl(var(--primary)) 0%, color-mix(in oklch, hsl(var(--primary)), black 28%) 100%)";
const CTA_GRADIENT =
  "linear-gradient(135deg, hsl(var(--primary)) 0%, color-mix(in oklch, hsl(var(--primary)), black 22%) 100%)";

/* ─── data ─────────────────────────────────────────── */
const SERVICES = [
  {
    category: "Digital Requests",
    icon: Smartphone,
    color: "text-portal-info",
    bg: "bg-portal-info/10",
    items: [
      { icon: CreditCard,  label: "Apply for Loan",        sub: "Online application, no office visit" },
      { icon: PiggyBank,   label: "Open Savings Account",  sub: "Start saving in minutes" },
      { icon: FileText,    label: "Request Documents",      sub: "Certificates, statements, NOC" },
      { icon: Download,    label: "Download Forms",         sub: "All forms in one place" },
    ],
  },
  {
    category: "Member Info",
    icon: BookOpen,
    color: "text-portal-success",
    bg: "bg-portal-success/10",
    items: [
      { icon: Star,        label: "Share Capital",          sub: "View your shareholding" },
      { icon: Zap,         label: "Dividends & Returns",    sub: "Annual dividend history" },
      { icon: Shield,      label: "Insurance Schemes",      sub: "Member-exclusive covers" },
      { icon: BookOpen,    label: "Loan Calculator",        sub: "EMI & interest estimator" },
    ],
  },
  {
    category: "Info & Updates",
    icon: Megaphone,
    color: "text-portal-warning",
    bg: "bg-portal-warning/10",
    items: [
      { icon: Megaphone,   label: "Notices & Circulars",    sub: "Official announcements" },
      { icon: MapPin,      label: "Branch & ATM Locator",   sub: "Find us near you" },
      { icon: HelpCircle,  label: "FAQ & Help",             sub: "Common questions answered" },
      { icon: Phone,       label: "Contact Us",             sub: "Call, email or visit" },
    ],
  },
];

const FEATURES = [
  { icon: Home,   title: "Ghar Batai Seva", sub: "घरबाटै सेवा", desc: "Office नआई सबै request online" },
  { icon: Clock,  title: "24/7 Available",  sub: "जुनसुकै बेला", desc: "दिनरात जुनसुकै समयमा" },
  { icon: Wifi,   title: "100% Digital",    sub: "पूर्ण डिजिटल",  desc: "कागज, लाइन र पर्खाइ छैन" },
];

/* ─── helpers ─────────────────────────────────────── */
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1">
      <span className="text-[11px] font-semibold text-white/90">9:41</span>
      <div className="flex items-center gap-1">
        {[4, 3, 2].map(h => (
          <div key={h} className="w-1 rounded-sm bg-white" style={{ height: h * 3 }} />
        ))}
        <div className="ml-1 w-5 h-2.5 rounded-sm border border-white relative">
          <div className="absolute inset-0.5 right-1 bg-white rounded-[1px]" />
          <div className="absolute right-[-3px] top-0.5 w-0.5 h-1.5 bg-white rounded-r-sm" />
        </div>
      </div>
    </div>
  );
}

/* ─── main ──────────────────────────────────────────── */
export default function PublicPortalMobile() {
  const [menuOpen,     setMenuOpen]     = React.useState(false);
  const [expandedCat,  setExpandedCat]  = React.useState<string | null>("Digital Requests");
  const [activeTab,    setActiveTab]    = React.useState<"services" | "info">("services");

  return (
    <div
      className="w-[390px] h-[780px] flex flex-col overflow-hidden rounded-[44px] shadow-2xl border border-border relative select-none bg-background"
      style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}
    >
      {/* ── HERO HEADER ── */}
      <div className="flex-shrink-0 relative" style={{ background: HERO_GRADIENT }}>
        <StatusBar />

        {/* Nav row */}
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight">Coop Nepal</p>
              <p className="text-white/70 text-[10px] leading-tight">Digital Services</p>
            </div>
          </div>

          <button
            onClick={() => {}}
            className="flex items-center gap-1 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 active:bg-white/25 transition-colors"
          >
            <LogIn className="h-3 w-3" />
            Login
          </button>
          <button
            className="flex items-center gap-1 bg-white text-xs font-bold px-3 py-1.5 rounded-full active:opacity-80 transition-opacity"
            style={{ color: "hsl(var(--primary))" }}
          >
            <UserPlus className="h-3 w-3" />
            Join
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white active:bg-white/25 transition-colors backdrop-blur-sm"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Hero message */}
        <div className="px-5 pt-2 pb-6">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-portal-highlight" />
            <span className="text-portal-highlight text-[11px] font-semibold uppercase tracking-wider">
              घरबाटै सेवा
            </span>
          </div>
          <h1 className="text-white font-bold text-xl leading-snug mb-1">
            Office नआई<br />
            <span className="text-white/80">सबै सेवा अनलाइन</span>
          </h1>
          <p className="text-white/65 text-xs leading-relaxed">
            Loan, savings, documents — सबै digital request गर्नुस्।
          </p>

          <div className="flex gap-2 mt-3">
            {["No paperwork", "Instant status", "Secure"].map(f => (
              <div key={f} className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1 text-[10px] text-white/80 backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="h-2.5 w-2.5 text-portal-success" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div className="flex-1 overflow-y-auto">

        {/* Tab switcher */}
        <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-2 flex gap-1">
          {(["services", "info"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab === "services" ? "🛎 Digital Services" : "ℹ️ Info & Help"}
            </button>
          ))}
        </div>

        {activeTab === "services" && (
          <div className="py-3 pb-6">
            {/* Feature cards */}
            <div className="flex gap-2.5 px-4 mb-4 overflow-x-auto scrollbar-hide py-1">
              {FEATURES.map(f => (
                <div key={f.title}
                  className="flex-shrink-0 w-[140px] bg-card border border-border rounded-2xl p-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <f.icon className="h-[18px] w-[18px] text-primary" />
                  </div>
                  <p className="text-xs font-bold text-foreground leading-tight">{f.title}</p>
                  <p className="text-[10px] text-primary font-medium mb-0.5">{f.sub}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Service accordion */}
            {SERVICES.map(cat => {
              const CatIcon = cat.icon;
              const isOpen = expandedCat === cat.category;
              return (
                <div key={cat.category} className="mx-4 mb-2 bg-card border border-border rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setExpandedCat(isOpen ? null : cat.category)}
                    className="w-full flex items-center gap-3 px-4 py-3.5"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.bg}`}>
                      <CatIcon className={`h-[18px] w-[18px] ${cat.color}`} />
                    </div>
                    <span className="flex-1 text-sm font-semibold text-foreground text-left">
                      {cat.category}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-border">
                      {cat.items.map((item, i) => (
                        <button
                          key={item.label}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted active:bg-muted transition-colors ${
                            i < cat.items.length - 1 ? "border-b border-border/60" : ""
                          }`}
                        >
                          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-sm font-medium text-foreground leading-tight">
                              {item.label}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">{item.sub}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Login CTA banner */}
            <div className="mx-4 mt-3 rounded-2xl p-4 relative overflow-hidden"
              style={{ background: CTA_GRADIENT }}>
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
              <p className="text-white font-bold text-sm mb-0.5">Already a member?</p>
              <p className="text-white/70 text-xs mb-3">
                Login गरेर आफ्नो account manage गर्नुस्।
              </p>
              <button className="flex items-center gap-2 bg-white text-sm font-bold px-4 py-2 rounded-xl active:opacity-80 transition-opacity"
                style={{ color: "hsl(var(--primary))" }}>
                <LogIn className="h-4 w-4" />
                Member Login
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="py-3 pb-6">
            {/* Contact */}
            <div className="mx-4 bg-card border border-border rounded-2xl overflow-hidden mb-3">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</p>
              </div>
              {[
                { icon: Phone, label: "Helpline",    val: "+977-01-4XXXXXX" },
                { icon: Mail,  label: "Email",       val: "info@coop.org.np" },
                { icon: MapPin,label: "Head Office", val: "Kathmandu, Nepal" },
              ].map(c => (
                <button key={c.label}
                  className="w-full flex items-center gap-3 px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted active:bg-muted transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[10px] text-muted-foreground">{c.label}</p>
                    <p className="text-sm font-medium text-foreground">{c.val}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>

            {/* FAQ */}
            <div className="mx-4 bg-card border border-border rounded-2xl overflow-hidden mb-3">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Common Questions</p>
              </div>
              {[
                "Loan apply गर्न office जानु पर्छ?",
                "Digital request को status कसरी थाहा पाउने?",
                "Member बन्न के चाहिन्छ?",
                "Interest rates कति छ?",
              ].map((q, i) => (
                <button key={i}
                  className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-border/50 last:border-0 hover:bg-muted active:bg-muted transition-colors text-left">
                  <HelpCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="flex-1 text-sm text-foreground">{q}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Register CTA */}
            <div className="mx-4 bg-card border-2 border-primary/30 rounded-2xl p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-bold text-foreground mb-1">सदस्य बन्नुस्!</p>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Join गर्नुस् र घरबाटै digital services लिनुस्।<br />
                Office visit आवश्यक छैन।
              </p>
              <button className="w-full py-3 rounded-xl text-sm font-bold text-primary-foreground active:opacity-90 transition-opacity"
                style={{ background: "hsl(var(--primary))" }}>
                Register / नयाँ Member
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── FULL-SCREEN MENU DRAWER ── */}
      {menuOpen && (
        <div className="absolute inset-0 z-50 flex flex-col">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setMenuOpen(false)} />

          <div className="relative mt-auto bg-card rounded-t-[28px] max-h-[88%] flex flex-col shadow-2xl">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "hsl(var(--primary))" }}>
                  <span className="text-white font-black text-sm">C</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Coop Nepal</p>
                  <p className="text-[10px] text-muted-foreground">Digital Services Portal</p>
                </div>
              </div>
              <button onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex gap-2.5 px-5 py-3 border-b border-border">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                <LogIn className="h-4 w-4" />
                Member Login
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-primary-foreground transition-opacity active:opacity-90"
                style={{ background: "hsl(var(--primary))" }}>
                <UserPlus className="h-4 w-4" />
                Register
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-2">
              {SERVICES.flatMap(cat =>
                cat.items.map(item => (
                  <button key={item.label}
                    className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-muted active:bg-muted transition-colors border-b border-border/40 last:border-0"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.bg}`}>
                      <item.icon className={`h-[18px] w-[18px] ${cat.color}`} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.sub}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </button>
                ))
              )}
            </div>

            <div className="border-t border-border px-5 py-4 pb-8 flex items-center justify-between">
              {[
                { icon: Phone, label: "Call Us" },
                { icon: Mail,  label: "Email" },
                { icon: MapPin,label: "Find Us" },
              ].map(({ icon: Icon, label }) => (
                <button key={label}
                  className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px]">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
