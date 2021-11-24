"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client();
/**
 * 接続確認のために bot 名を表示
 */
client.on('ready', function () {
    if (!client.user) {
        console.error('認証できないよ');
        return;
    }
    console.log("Logged in as " + client.user.tag + ".");
});
/**
 * チャット欄のコメントを受け取ってメンバーリストを返す処理
 */
client.on('message', function (message) {
    if (!message.guild) {
        console.error('ギルドがないよ');
        return;
    }
    // `!gacha` 以外のコマンドだったら無視
    if (message.content !== '!gacha') {
        return;
    }
    // 現状のチャンネル一覧から daily_scrum チャンネルを取得
    var voiceChs = client.channels.cache.filter(function (ch) { return ch instanceof discord_js_1.VoiceChannel; });
    // daily_scrum ボイスチャンネルを特定
    // TODO: ボイスチャンネルの型を当てたい
    var targetVoiceCh = voiceChs.find(function (ch) { return ch.id === '908188153792311297'; });
    if (!targetVoiceCh) {
        console.error('チャンネルがみっかんないよ');
        return;
    }
    // 参加中の voice チャンネルの参加者全員の名前を取得
    var voiceCHMemberNames = targetVoiceCh.members
        .map(function (member) { return member.user.username; });
    // ランダムに並び替える
    var shuffledMembers = shuffleArray(voiceCHMemberNames);
    // リストにしてテキストチャンネルに送信する
    var joinedMembers = shuffledMembers
        .map(function (member, index) { return index + 1 + ". " + member; })
        .join('\n');
    var sendMessage = joinedMembers || 'ボイスチャンネルのメンバーを取得できなかったよ';
    // メッセージを返す
    message.channel.send(sendMessage);
});
// 与えられた配列をシャッフルして返す
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
