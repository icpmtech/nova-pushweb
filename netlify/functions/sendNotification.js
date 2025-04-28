const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'BKuEzTn7FGrDRUOr5DJKgKnI7c8k0_cvlqDArW-puXLV7o8b8Yne3cGpNh8oz23cIdqjWT2W7CzQMIWhrF9n9wI',
  privateKey: 'qDBYfBvLdO2x5o4EFl90g7zB7CU5Y92SMcePb8W4Y0Y'
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
