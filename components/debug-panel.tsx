"use client";

import { Monitor, Smartphone, Globe, Wifi } from "lucide-react";

interface DebugInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isStandalone: boolean;
  swRegistered: boolean;
  notificationSupport: boolean;
  permissionState: string;
  protocol: string;
}

export function DebugPanel({ info }: { info: DebugInfo }) {
  const rows = [
    {
      icon: Smartphone,
      label: "Platform",
      value: info.isIOS ? "iOS" : info.isAndroid ? "Android" : "Desktop",
    },
    {
      icon: Monitor,
      label: "Standalone (PWA)",
      value: info.isStandalone ? "Yes" : "No",
      ok: info.isStandalone,
    },
    {
      icon: Wifi,
      label: "Service Worker",
      value: info.swRegistered ? "Registered" : "Not Registered",
      ok: info.swRegistered,
    },
    {
      icon: Globe,
      label: "Protocol",
      value: info.protocol,
      ok: info.protocol === "https:" || info.protocol === "localhost",
    },
    {
      icon: Globe,
      label: "Notification API",
      value: info.notificationSupport ? "Supported" : "Not Supported",
      ok: info.notificationSupport,
    },
    {
      icon: Globe,
      label: "Permission",
      value: info.permissionState,
      ok: info.permissionState === "granted",
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto mt-6">
      <div className="bg-card rounded-2xl border border-border p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Debug Info
        </h3>
        <div className="flex flex-col gap-2">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <div
                key={row.label}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{row.label}</span>
                </div>
                <span
                  className={`font-medium ${
                    row.ok === undefined
                      ? "text-card-foreground"
                      : row.ok
                        ? "text-[#22c55e]"
                        : "text-[#f59e0b]"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
