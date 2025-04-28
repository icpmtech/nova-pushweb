const webpush = require('web-push');

// VAPID Keys recebidas de ti
let vapidKeys = {
  publicKey: 'BHEM8gdvj5BLj28MxPEUdQBp_a1-6Uap1tiks4NOEQyrVpX0lMrUBilSZt5p7WQiXgBbJCas-qaE3QkMJewVduQ',
  privateKey: 'cnJEgKylEgd-y_BiIMAtb713x6wHGOnwhtFd2-vzrto'
};

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
