import * as React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Ban,
  Hourglass,
  RefreshCw,
} from "lucide-react";

type StatusKey =
  | "active"
  | "inactive"
  | "expired"
  | "pending"
  | "suspended"
  | "expiring"
  | "reviewing";

interface StatusConfig {
  label: string;
  nepali: string;
  icon: React.ElementType;
  className: string;
  dotColor: string;
}

const STATUS_MAP: Record<StatusKey, StatusConfig> = {
  active: {
    label: "Active",
    nepali: "सक्रिय",
    icon: CheckCircle2,
    className:
      "bg-green-500/10 text-green-700 border-green-300 dark:text-green-400 dark:border-green-800",
    dotColor: "bg-green-500",
  },
  inactive: {
    label: "Inactive",
    nepali: "निष्क्रिय",
    icon: XCircle,
    className:
      "bg-muted text-muted-foreground border-border",
    dotColor: "bg-muted-foreground",
  },
  expired: {
    label: "Expired",
    nepali: "म्याद सकियो",
    icon: XCircle,
    className:
      "bg-destructive/10 text-destructive border-destructive/30",
    dotColor: "bg-destructive",
  },
  pending: {
    label: "Pending",
    nepali: "पेन्डिङ",
    icon: Clock,
    className:
      "bg-amber-500/10 text-amber-700 border-amber-300 dark:text-amber-400 dark:border-amber-800",
    dotColor: "bg-amber-500",
  },
  suspended: {
    label: "Suspended",
    nepali: "निलम्बित",
    icon: Ban,
    className:
      "bg-orange-500/10 text-orange-700 border-orange-300 dark:text-orange-400 dark:border-orange-800",
    dotColor: "bg-orange-500",
  },
  expiring: {
    label: "Expiring Soon",
    nepali: "म्याद सकिँदो",
    icon: Hourglass,
    className:
      "bg-yellow-500/10 text-yellow-700 border-yellow-300 dark:text-yellow-500 dark:border-yellow-800",
    dotColor: "bg-yellow-500",
  },
  reviewing: {
    label: "Under Review",
    nepali: "समीक्षाधीन",
    icon: RefreshCw,
    className:
      "bg-blue-500/10 text-blue-700 border-blue-300 dark:text-blue-400 dark:border-blue-800",
    dotColor: "bg-blue-500",
  },
};

function StatusBadge({
  status,
  size = "md",
  showNepali = false,
  variant = "pill",
}: {
  status: StatusKey;
  size?: "sm" | "md" | "lg";
  showNepali?: boolean;
  variant?: "pill" | "dot" | "outline";
}) {
  const cfg = STATUS_MAP[status];
  const Icon = cfg.icon;

  const sizeMap = {
    sm: "text-[10px] px-1.5 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2",
  };

  if (variant === "dot") {
    return (
      <div className={`inline-flex items-center gap-1.5 ${sizeMap[size]} text-muted-foreground`}>
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dotColor}`} />
        <span className="text-foreground font-medium">{showNepali ? cfg.nepali : cfg.label}</span>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${sizeMap[size]} ${cfg.className} ${
        variant === "outline" ? "bg-transparent" : ""
      }`}
    >
      <Icon className={`flex-shrink-0 ${size === "sm" ? "h-2.5 w-2.5" : size === "lg" ? "h-4 w-4" : "h-3 w-3"}`} />
      {showNepali ? cfg.nepali : cfg.label}
    </span>
  );
}

const DEMO_MEMBERS = [
  { name: "Ram Bahadur Thapa", id: "M-1042", status: "active" as StatusKey },
  { name: "Sita Kumari Sharma", id: "M-1043", status: "pending" as StatusKey },
  { name: "Hari Prasad Adhikari", id: "M-1044", status: "expired" as StatusKey },
  { name: "Gita Devi Poudel", id: "M-1045", status: "suspended" as StatusKey },
  { name: "Krishna Bahadur KC", id: "M-1046", status: "expiring" as StatusKey },
  { name: "Sunita Rai", id: "M-1047", status: "reviewing" as StatusKey },
  { name: "Binod Kumar Joshi", id: "M-1048", status: "inactive" as StatusKey },
];

export default function StatusBadges() {
  const [showNepali, setShowNepali] = React.useState(false);
  const [badgeVariant, setBadgeVariant] = React.useState<"pill" | "dot" | "outline">("pill");

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-lg font-bold text-foreground">Status Badge System</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Global theme-aware status indicators</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {(["pill", "dot", "outline"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setBadgeVariant(v)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                badgeVariant === v
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowNepali(!showNepali)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            showNepali
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:text-foreground"
          }`}
        >
          {showNepali ? "Showing Nepali" : "Show Nepali"}
        </button>
      </div>

      {/* All status badges — sizes */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">All Status Types</h3>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground w-5">{size}</span>
            {(Object.keys(STATUS_MAP) as StatusKey[]).map((status) => (
              <StatusBadge
                key={status}
                status={status}
                size={size}
                showNepali={showNepali}
                variant={badgeVariant}
              />
            ))}
          </div>
        ))}
      </div>

      {/* In-context table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Member List — Status in Context</h3>
        </div>
        <div className="divide-y divide-border">
          {DEMO_MEMBERS.map((member) => (
            <div key={member.id} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-tight truncate">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.id}</p>
              </div>
              <StatusBadge status={member.status} showNepali={showNepali} variant={badgeVariant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
