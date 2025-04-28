self.addEventListener('install', event => {
  console.log('[Service Worker] Instalado');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Ativado');
  return self.clients.claim();
});

self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('Push recebido', data);

  const options = {
    body: data.body,
    icon: '/icon.png',
    badge: '/icon.png',
    data: { url: 'https://www.google.com' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});