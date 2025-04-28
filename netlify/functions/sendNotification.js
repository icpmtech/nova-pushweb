const webpush = require('web-push');

// As tuas chaves VAPID (já corretas para Chrome/Edge)
const vapidKeys = {
  publicKey: 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEX6hprj0NEyYRTwZdWwinNZx7ttiHYoqm5liJSGWfbajbqKXr83nVhurzD7KhC24O4IvzN5w7MGxAPfGy/A7Kig==',
  privateKey: 'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgTPlN5WSkK5TajnYrl7wMTHcnKpnSpoXmHXmhcPCLrGGhRANCAARfqGmuPQ0TJhFPBl1bCKc1nHu22IdiiqbmWIlIZZ9tqNuopevzedWG6vMPsqELbg7gi/M3nDswbEA98bL8DsqK'
};

// Configurar web-push
webpush.setVapidDetails(
  'mailto:pedro@cantinhode.net',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

exports.handler = async (event) => {
  const subscription = JSON.parse(event.body);

  const payload = JSON.stringify({
    title: 'Nova Notificação!',
    body: 'Esta é uma notificação enviada via Web Push!'
  });

  try {
    await webpush.sendNotification(subscription, payload);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Notificação enviada!' })
    };
  } catch (error) {
    console.error('Erro ao enviar push:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao enviar push', details: error.message })
    };
  }
};
