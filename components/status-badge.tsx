"use client";

import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

type StatusType = "granted" | "denied" | "default" | "unsupported";

const statusConfig: Record<
  StatusType,
  { icon: typeof CheckCircle2; label: string; color: string; bg: string }
> = {
  granted: {
    icon: CheckCircle2,
    label: "Notifications Enabled",
    color: "text-[#22c55e]",
    bg: "bg-[#22c55e]/10",
  },
  denied: {
    icon: XCircle,
    label: "Notifications Blocked",
    color: "text-[#ef4444]",
    bg: "bg-[#ef4444]/10",
  },
  default: {
    icon: AlertCircle,
    label: "Notifications Not Set",
    color: "text-[#f59e0b]",
    bg: "bg-[#f59e0b]/10",
  },
  unsupported: {
    icon: XCircle,
    label: "Not Supported",
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
};

export function StatusBadge({ status }: { status: StatusType }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </div>
  );
}
