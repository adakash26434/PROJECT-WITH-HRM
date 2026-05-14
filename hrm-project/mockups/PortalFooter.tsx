import * as React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Youtube,
  ExternalLink,
} from "lucide-react";

const LINKS = {
  "Member Services": ["Apply for Loan", "Fixed Deposits", "Savings Account", "Share Capital", "Statement"],
  "Admin Tools": ["Dashboard", "Member Management", "Reports", "Settings", "Audit Log"],
  "Help & Support": ["FAQ", "Contact Us", "Grievance Portal", "Downloads", "Branch Locator"],
};

const CONTACT = [
  { icon: Phone, text: "+977-01-4XXXXXX" },
  { icon: Mail, text: "info@coop.org.np" },
  { icon: MapPin, text: "Kathmandu, Nepal" },
];

type Variant = "public" | "admin";

export default function PortalFooter() {
  const [variant, setVariant] = React.useState<Variant>("public");
  const isAdmin = variant === "admin";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Variant toggle (for preview only) */}
      <div className="flex gap-2 p-4 border-b border-border bg-card justify-center">
        {(["public", "admin"] as Variant[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              variant === v
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {v === "public" ? "Member Portal" : "Admin Portal"}
          </button>
        ))}
      </div>

      {/* Page ghost */}
      <div className="flex-1 p-6 opacity-20 pointer-events-none">
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 h-32 bg-foreground/10 rounded-xl border border-border" />
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer
        className="border-t border-border"
        style={{
          background: isAdmin
            ? "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)"
            : "hsl(var(--card))",
        }}
      >
        {/* Main footer body */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isAdmin
                      ? "linear-gradient(135deg, hsl(var(--destructive)) 0%, hsl(0 72% 50%) 100%)"
                      : "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(221 83% 53%) 100%)",
                  }}
                >
                  <span className="text-white font-black text-sm">C</span>
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm leading-tight">Coop Nepal</p>
                  <p className="text-[10px] text-muted-foreground leading-tight uppercase tracking-wide">
                    {isAdmin ? "Admin Portal" : "Member Portal"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Serving members with transparency, trust, and technology.
              </p>

              {/* Contact */}
              <div className="space-y-1.5">
                {CONTACT.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="h-3 w-3 flex-shrink-0 text-primary" />
                    {text}
                  </div>
                ))}
              </div>

              {/* Social — desktop only, no mobile-only icons */}
              <div className="flex items-center gap-2 mt-4">
                {[Facebook, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-7 h-7 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center text-muted-foreground transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
                  {title}
                </h4>
                <ul className="space-y-1.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors group"
                      >
                        {link}
                        <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar — compact height like top header ── */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between gap-4">
            <p className="text-[11px] text-muted-foreground">
              © {new Date().getFullYear()} Coop Nepal Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {["Privacy Policy", "Terms of Use"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              ))}
              <span className="text-[11px] text-muted-foreground/60">
                Developed by{" "}
                <a href="#" className="text-primary hover:underline">
                  CoopTech
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
