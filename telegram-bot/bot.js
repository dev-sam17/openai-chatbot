require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.onText('/start', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello! This is your Telegram bot speaking.');
});

bot.onText('/sayhello', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello, human!');
});
