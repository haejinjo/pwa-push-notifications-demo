"use client";

export function PointingHand() {
  return (
    <div className="flex justify-center mt-4" aria-hidden="true">
      <svg
        width="48"
        height="64"
        viewBox="0 0 48 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-bounce-point"
      >
        {/* Hand pointing up */}
        <path
          d="M24 4 L24 40"
          stroke="#00AFF0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M24 4 L18 14"
          stroke="#00AFF0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M24 4 L30 14"
          stroke="#00AFF0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Hand shape */}
        <circle cx="24" cy="46" r="10" fill="#00AFF0" opacity="0.15" />
        <path
          d="M19 42 C19 38, 29 38, 29 42 L29 50 C29 54, 19 54, 19 50 Z"
          fill="#00AFF0"
          opacity="0.3"
        />
        {/* Finger */}
        <rect
          x="21.5"
          y="4"
          width="5"
          height="18"
          rx="2.5"
          fill="#00AFF0"
        />
        <circle cx="24" cy="4" r="3" fill="#00AFF0" />
      </svg>
    </div>
  );
}
