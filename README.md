# pwa-push-notifications-demo

A compact Next.js PWA demo that checks whether a web app can surface the browser's "Allow Notifications" permission prompt across desktop, Android, and iOS (including iOS's Add-to-Home-Screen requirement).

## Writeup

Background and findings are in my blog post: https://www.hejinjo.com/blog/pwa-push-notifications-2026

## What this project demonstrates

- The Notification permission flow across platforms (desktop, Android, and iOS).
- Why iOS requires the app to be installed (standalone/home-screen) before the Notification API is available.
- A simple debug panel that shows which preconditions (HTTPS, service worker, standalone mode, etc.) are satisfied.

## Try It Yourself

Visit the live demo to see the debug panel and permission flow in action:

[v0-notification-permission-pwa.vercel.app](https://v0-notification-permission-pwa.vercel.app/)

## Collaboration 

If something doesn't work on your device or browser, please open an issue at https://github.com/haejinjo/pwa-push-notifications-demo.

## Quick local setup

1. Prerequisites: Node.js 18+ and `pnpm` (or `npm`).

2. Install dependencies:

```bash
pnpm install
```

3. Run the dev server:

```bash
pnpm dev
# then open http://localhost:3000
```

4. To test notifications on a physical device:

- Deploy to an HTTPS host (Vercel is recommended) or expose your local server with an HTTPS tunnel (`ngrok` etc.).
- On iOS: add the site to the home screen and launch it from the home screen to enable the Notification API.

That's it. The live demo is the fastest way to see the behavior, or run locally if you prefer to inspect or extend the code.

