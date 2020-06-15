const TeleBot = require('node-telegram-bot-api');
const TOKEN = '1269380909:AAGnlbcin_c8YvU2q2dzqNcgIejHTO3L4VQ';

const bot = new TeleBot(TOKEN, {
    polling: true
});
// https://t.me/agapkinabot

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    if(msg.text){
        bot.sendMessage(chatId, `echo: ${msg.text}`);
    }
    else{
        bot.sendMessage(chatId, `Send a text message`);
    }
});
