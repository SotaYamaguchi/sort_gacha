"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client();
client.on('message', function (message) {
    if (message.author.bot) {
        return;
    }
    if (message.content === 'おはよう') {
        message.channel.send('どうもどうも');
    }
});
// トークンを発行したアプリケーション名を確認のために表示
client.on('ready', function () {
    if (!client.user) {
        console.error('認証できないよ');
        return;
    }
    console.log("Logged in as " + client.user.tag + ".");
});
/**
 * チャット欄のコメントを受け取る処理
 */
client.on('message', function (message) {
    if (!message.guild) {
        console.error('ギルドがないよ');
        return;
    }
    if (message.content === '!gacha') {
        var textCH = message.guild.channels.cache.find(function (ch) { return ch.type === 'text'; });
        if (!textCH) {
            return;
        }
        var textCHMemberNames = textCH.guild.members.cache
            .filter(function (member) { return !member.user.bot; })
            .map(function (member) { return member.user.username; });
        var shuffledMembers = shuffleArray(textCHMemberNames);
        var joinedMembers = shuffledMembers
            .map(function (member, index) { return index + 1 + ". " + member; })
            .join('\n');
        message.channel.send(joinedMembers);
    }
});
var shuffleArray = function (array) {
    for (var i = (array.length - 1); 0 < i; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
};
var token = process.env.DISCORD_TOKEN;
client.login(token);
