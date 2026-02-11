"use client";

import { Share, Plus, ExternalLink, X } from "lucide-react";

export function IOSInstallOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#000000]/60 p-4 pb-8">
      <div
        className="w-full max-w-sm bg-card rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300"
        role="dialog"
        aria-label="Add to Home Screen instructions"
      >
        {/* Header */}
        <div className="relative bg-[#00AFF0] px-6 pt-6 pb-5">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFFFFF]/20 flex items-center justify-center text-[#FFFFFF] hover:bg-[#FFFFFF]/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <h3 className="text-lg font-bold text-[#FFFFFF] pr-8">
            Add to Home Screen
          </h3>
          <p className="text-sm text-[#FFFFFF]/80 mt-1">
            Required for notifications on iOS
          </p>
        </div>

        {/* Steps */}
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00AFF0]/10 flex items-center justify-center shrink-0">
              <Share className="w-5 h-5 text-[#00AFF0]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#00AFF0] bg-[#00AFF0]/10 px-2 py-0.5 rounded-full">
                  Step 1
                </span>
              </div>
              <p className="text-sm text-card-foreground mt-1 font-medium">
                Tap the{" "}
                <Share className="w-3.5 h-3.5 inline-block text-[#00AFF0] -mt-0.5" />{" "}
                <strong>Share</strong> button in Safari
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00AFF0]/10 flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5 text-[#00AFF0]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#00AFF0] bg-[#00AFF0]/10 px-2 py-0.5 rounded-full">
                  Step 2
                </span>
              </div>
              <p className="text-sm text-card-foreground mt-1 font-medium">
                Scroll down and tap{" "}
                <strong>{"\"Add to Home Screen\""}</strong>
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00AFF0]/10 flex items-center justify-center shrink-0">
              <ExternalLink className="w-5 h-5 text-[#00AFF0]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#00AFF0] bg-[#00AFF0]/10 px-2 py-0.5 rounded-full">
                  Step 3
                </span>
              </div>
              <p className="text-sm text-card-foreground mt-1 font-medium">
                Open the app from your <strong>Home Screen</strong> to enable
                notifications
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#00AFF0] text-[#FFFFFF] font-semibold text-sm transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
