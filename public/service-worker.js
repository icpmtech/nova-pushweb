self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('Push recebido', data);

  const options = {
    body: data.body,
    icon: '/icon.png',
    data: {
      url: 'https://www.google.com'
    }
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