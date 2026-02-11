export async function GET() {
  const swCode = `
    self.addEventListener('install', (event) => {
      self.skipWaiting();
    });

    self.addEventListener('activate', (event) => {
      event.waitUntil(clients.claim());
    });

    self.addEventListener('push', (event) => {
      const data = event.data ? event.data.json() : {};
      const title = data.title || 'New Notification';
      const options = {
        body: data.body || 'You have a new message!',
        icon: '/icon-192.jpg',
        badge: '/icon-192.jpg',
      };
      event.waitUntil(self.registration.showNotification(title, options));
    });

    self.addEventListener('notificationclick', (event) => {
      event.notification.close();
      event.waitUntil(clients.openWindow('/'));
    });

    self.addEventListener('fetch', (event) => {
      // Pass-through fetch handler required for PWA
    });
  `;

  return new Response(swCode, {
    headers: {
      "Content-Type": "application/javascript",
      "Service-Worker-Allowed": "/",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
