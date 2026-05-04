require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const Replicate = require("replicate");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 Ayan AI Bot Ready!\n\nSend prompt to create video 🎬");
});

// Handle message → create video
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const prompt = msg.text;

  if (msg.text === "/start") return;

  bot.sendMessage(chatId, "⏳ Creating video... wait");

  try {
    const output = await replicate.run(
      "tencent/hunyuan-video:latest",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    bot.sendMessage(chatId, "✅ Video ready:");
    const videoUrl = Array.isArray(output) ? output[0] : output;
bot.sendVideo(chatId, videoUrl);

  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, "❌ Error creating video");
  }
});
