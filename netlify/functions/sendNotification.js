const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'BFIKfwEcsb9Uguw0v2z1oOfVgE0lsSOPqkFq66Xz9Vq4W2eO7EK5gGxHDIWYl0QYwRg-M8FcEUNe5IXwx4txZGc',
  privateKey: 'mSkEVhLQw5SlN4gc1c4cMxXLoC6FYOehG_J8qtaEec4'
};

webpush.setVapidDetails(
  'mailto:teu@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

exports.handler = async (event) => {
  const subscription = JSON.parse(event.body);

  const payload = JSON.stringify({
    title: 'Nova Notificação!',
    body: 'Enviada sem Firebase, 100% controlada por ti!'
  });

  try {
    await webpush.sendNotification(subscription, payload);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Notificação enviada!' })
    };
  } catch (error) {
    console.error('Erro:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao enviar push' })
    };
  }
};