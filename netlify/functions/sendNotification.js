const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'BFA3rK2osEArdTWujd9Xss9e7X8OT2LJuGHj9TnVnUQYUpYtlfq-M7qkPUg9OCfWoxgPV6pE8Zpa7AztvT2xZSo',
  privateKey: 'OxOd4j3GyGvA7fjKblT6TJSPjwogZdT7pV2FV7sm82E'
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
    body: 'Esta é uma notificação Web Push sem Firebase!'
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