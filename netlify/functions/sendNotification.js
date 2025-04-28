const webpush = require('web-push');

// Nova VAPID keys corretas
let vapidKeys = {
  publicKey: 'BMUgJ9mU1wvlDHEyZrJMG0IuGdeCJnC7rWtjGYEyQe0TrQbziY9-wNI5E1kR-4bgCLY0yIRVarVWBioq25FzB8I',
  privateKey: 'Ej_9xQfy_l9tHcUtTxRuaSEe5zhAEhYqvZ9Rijw0VVA'
};

// Configurar webpush
webpush.setVapidDetails(
  'mailto:mourao.martins@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

exports.handler = async (event) => {
  try {
    const subscription = JSON.parse(event.body);

    const payload = JSON.stringify({
      title: 'Nova Notificação!',
      body: 'Esta é uma notificação enviada via Web Push!'
    });

    await webpush.sendNotification(subscription, payload);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Notificação enviada com sucesso!' })
    };
  } catch (error) {
    console.error('Erro ao enviar push:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao enviar push', details: error.message })
    };
  }
};

exports.vapidKeys = vapidKeys; // Exporta para updateVapidKey.js
