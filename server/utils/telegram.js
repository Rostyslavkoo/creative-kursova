const axios = require('axios');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

exports.sendApplicationToTelegram = async (application) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing');
    return;
  }

  const text = `
#заявка_на_пробне_заняття

Ім'я дитини: ${application.studentName}
Вік дитини: ${application.birthDate}
Номер телефону: ${application.phone}
Електронна пошта: ${application.email}
Ім'я дорослого: ${application.parentName}
Повідомлення: ${application.message || '---'}
  `.trim();

  try {
    const res = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text
    });
    console.log('Telegram response:', res.data);
  } catch (err) {
    console.error('Telegram error:', err.response?.data || err.message);
  }
}; 