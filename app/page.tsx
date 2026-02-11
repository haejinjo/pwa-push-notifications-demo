"use client";

import { useEffect, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { NotificationModal } from "@/components/notification-modal";
import { PointingHand } from "@/components/pointing-hand";
import { IOSInstallOverlay } from "@/components/ios-install-overlay";
import { StatusBadge } from "@/components/status-badge";
import { DebugPanel } from "@/components/debug-panel";

type PermState = "default" | "granted" | "denied" | "unsupported";

function useDeviceDetection() {
  const [info, setInfo] = useState({
    isIOS: false,
    isAndroid: false,
    isStandalone: false,
    swRegistered: false,
    notificationSupport: false,
    permissionState: "default" as string,
    protocol: "",
  });

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/.test(ua);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    const notificationSupport = "Notification" in window;
    const permissionState = notificationSupport
      ? Notification.permission
      : "unsupported";

    setInfo({
      isIOS,
      isAndroid,
      isStandalone,
      swRegistered: false,
      notificationSupport,
      permissionState,
      protocol: window.location.protocol,
    });

    // Register Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then(() => {
          setInfo((prev) => ({ ...prev, swRegistered: true }));
        })
        .catch((err) => {
          console.log("[v0] SW registration failed:", err);
        });
    }
  }, []);

  return info;
}

export default function Page() {
  const deviceInfo = useDeviceDetection();
  const [permState, setPermState] = useState<PermState>("default");
  const [showIOSOverlay, setShowIOSOverlay] = useState(false);
  const [showSkipped, setShowSkipped] = useState(false);

  // Sync permission state from device info
  useEffect(() => {
    if (deviceInfo.notificationSupport) {
      setPermState(Notification.permission as PermState);
    } else {
      setPermState("unsupported");
    }
  }, [deviceInfo.notificationSupport]);

  const fireConfetti = useCallback(() => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#00AFF0", "#0090C0", "#FFFFFF"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#00AFF0", "#0090C0", "#FFFFFF"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleAllow = useCallback(() => {
    // iOS + not standalone => show Add to Home Screen instructions
    if (deviceInfo.isIOS && !deviceInfo.isStandalone) {
      setShowIOSOverlay(true);
      return;
    }

    // Check if Notification API exists
    if (!("Notification" in window)) {
      alert(
        "Notification API is not supported in this browser. Try opening this page in a modern browser.",
      );
      return;
    }

    // Request permission
    Notification.requestPermission().then((result) => {
      setPermState(result as PermState);

      if (result === "granted") {
        fireConfetti();
        // Send a test notification
        if (deviceInfo.swRegistered) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.showNotification("Notifications Enabled!", {
              body: "You'll now receive updates from your favorite creators.",
              icon: "/icon-192.jpg",
            });
          });
        } else {
          new Notification("Notifications Enabled!", {
            body: "You'll now receive updates from your favorite creators.",
            icon: "/icon-192.jpg",
          });
        }
      } else if (result === "denied") {
        alert(
          "Notifications were blocked. You can re-enable them in your browser settings.",
        );
      }
    });
  }, [deviceInfo, fireConfetti]);

  const handleSkip = useCallback(() => {
    setShowSkipped(true);
    setTimeout(() => setShowSkipped(false), 3000);
  }, []);

  const showModal = permState === "default" || permState === "unsupported";

  return (
    <main className="min-h-dvh bg-background flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Status Badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <StatusBadge
          status={permState === "unsupported" ? "unsupported" : permState}
        />
      </div>

      {/* Main Content */}
      {showModal ? (
        <div className="flex flex-col items-center">
          <NotificationModal onAllow={handleAllow} onSkip={handleSkip} />
          <PointingHand />
          {showSkipped && (
            <p className="mt-4 text-sm text-muted-foreground animate-in fade-in duration-300">
              You can enable notifications anytime from settings.
            </p>
          )}
        </div>
      ) : permState === "granted" ? (
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#22c55e]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground">
            {"You're All Set!"}
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Notifications are enabled. A test notification was sent to confirm
            everything is working.
          </p>
        </div>
      ) : (
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#ef4444]/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#ef4444]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Notifications Blocked
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            You blocked notifications. To re-enable, open your browser settings
            and allow notifications for this site.
          </p>
          <button
            type="button"
            onClick={() => {
              setPermState("default");
            }}
            className="mt-2 px-6 py-2.5 rounded-xl bg-[#00AFF0] text-[#FFFFFF] font-semibold text-sm transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Debug Panel */}
      <DebugPanel
        info={{
          ...deviceInfo,
          permissionState: permState,
        }}
      />

      {/* iOS Install Overlay */}
      {showIOSOverlay && (
        <IOSInstallOverlay onClose={() => setShowIOSOverlay(false)} />
      )}
    </main>
  );
}
