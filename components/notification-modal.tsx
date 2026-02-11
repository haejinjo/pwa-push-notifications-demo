"use client";

import { Bell, MessageCircle, Heart, Star } from "lucide-react";

export function NotificationModal({
  onAllow,
  onSkip,
}: {
  onAllow: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-card rounded-3xl shadow-xl overflow-hidden border border-border">
        {/* Header illustration */}
        <div className="relative bg-[#00AFF0] px-6 pt-8 pb-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-6 w-8 h-8 rounded-full bg-card" />
            <div className="absolute top-12 right-8 w-5 h-5 rounded-full bg-card" />
            <div className="absolute bottom-6 left-12 w-3 h-3 rounded-full bg-card" />
          </div>
          <div className="relative flex justify-center">
            <div className="w-20 h-20 bg-card/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bell className="w-10 h-10 text-[#FFFFFF]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-6 pb-4 text-center">
          <h2 className="text-xl font-bold text-card-foreground mb-2 text-balance">
            Turn On Notifications
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Never miss a thing from your favorite people. 
          </p>

          {/* Feature list */}
          <div className="flex flex-col gap-3 mb-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00AFF0]/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-[#00AFF0]" />
              </div>
              <span className="text-sm text-card-foreground">
                Direct messages
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00AFF0]/10 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-[#00AFF0]" />
              </div>
              <span className="text-sm text-card-foreground">
                Likes, comments & interactions
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00AFF0]/10 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 text-[#00AFF0]" />
              </div>
              <span className="text-sm text-card-foreground">
                Exclusive content
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onAllow}
            className="w-full py-3.5 rounded-xl bg-[#00AFF0] text-[#FFFFFF] font-semibold text-base transition-all hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Allow Notifications
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="w-full py-3 rounded-xl text-muted-foreground font-medium text-sm transition-colors hover:text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
