require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, "🔥 Ayan Bot is working!");
});
