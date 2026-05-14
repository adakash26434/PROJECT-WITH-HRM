import * as React from "react";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Wallet,
  FileText,
  ShieldAlert,
  ArrowUpRight,
  Clock,
} from "lucide-react";

type Trend = "up" | "down" | "neutral";

interface StatCard {
  label: string;
  value: string;
  sub: string;
  trend: Trend;
  trendLabel: string;
  icon: React.ElementType;
  accent: string;
}

const STATS: StatCard[] = [
  {
    label: "कुल सदस्य",
    value: "4,821",
    sub: "Total Members",
    trend: "up",
    trendLabel: "+38 this month",
    icon: Users,
    accent: "bg-blue-500/10 text-blue-600",
  },
  {
    label: "कर्जा बक्यौता",
    value: "₹ 2.4 Cr",
    sub: "Outstanding Loans",
    trend: "up",
    trendLabel: "+₹12L this month",
    icon: Wallet,
    accent: "bg-green-500/10 text-green-600",
  },
  {
    label: "बचत रकम",
    value: "₹ 8.1 Cr",
    sub: "Total Savings",
    trend: "up",
    trendLabel: "+₹31L this month",
    icon: TrendingUp,
    accent: "bg-purple-500/10 text-purple-600",
  },
  {
    label: "पेन्डिङ आवेदन",
    value: "47",
    sub: "Pending Applications",
    trend: "down",
    trendLabel: "-5 since yesterday",
    icon: FileText,
    accent: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "म्याद सकिँदो खाता",
    value: "12",
    sub: "Expiring Accounts",
    trend: "neutral",
    trendLabel: "Within 30 days",
    icon: Clock,
    accent: "bg-orange-500/10 text-orange-600",
  },
  {
    label: "निलम्बित खाता",
    value: "6",
    sub: "Suspended Accounts",
    trend: "down",
    trendLabel: "-2 this week",
    icon: ShieldAlert,
    accent: "bg-destructive/10 text-destructive",
  },
];

function TrendBadge({ trend, label }: { trend: Trend; label: string }) {
  return (
    <div
      className={`flex items-center gap-0.5 text-[11px] font-medium ${
        trend === "up"
          ? "text-green-600"
          : trend === "down"
          ? "text-destructive"
          : "text-muted-foreground"
      }`}
    >
      {trend === "up" && <TrendingUp className="h-3 w-3" />}
      {trend === "down" && <TrendingDown className="h-3 w-3" />}
      <span>{label}</span>
    </div>
  );
}

export default function DashboardStatCards() {
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Overview · May 2026
        </p>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-3">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                {/* Link arrow */}
                <button className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Value */}
              <div className="mb-1">
                <p className="text-2xl font-bold text-foreground leading-none">
                  {stat.value}
                </p>
              </div>

              {/* Labels — single, clear, not doubled */}
              <p className="text-sm font-medium text-foreground mb-0.5">{stat.label}</p>
              <p className="text-xs text-muted-foreground mb-2">{stat.sub}</p>

              {/* Trend */}
              <TrendBadge trend={stat.trend} label={stat.trendLabel} />
            </div>
          );
        })}
      </div>

      {/* Quick actions row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-muted-foreground mr-1">Quick actions:</span>
        {["Add Member", "New Loan", "Generate Report", "View Pending"].map((action) => (
          <button
            key={action}
            className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs text-foreground hover:bg-muted hover:border-ring transition-colors"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
