require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { sendResponse } = require('./chat');

const token = process.env.TG_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  try {
    if(msg.text === '/start' || msg.text === '/sayhello') {
        bot.sendMessage(chatId, `Hey, ${msg.from.first_name}. Welcome to the ChatGPT telegram bot!`);
      } else {
        const resp = await sendResponse(msg.text);
      // send a message to the chat acknowledging receipt of their message
      bot.sendMessage(chatId, resp);
      }
  } catch (error) {
    bot.sendMessage(chatId, "Something unpected happened. Please try after sometime.");
  }
});

bot.on('edited_message', async (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    const resp = await sendResponse(msg.text)
    bot.sendMessage(chatId, resp);
})