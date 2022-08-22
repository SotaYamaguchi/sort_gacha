"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages],
});
/**
 * 接続確認のために bot 名を表示
 */
client.once('ready', function () {
    if (!client.user) {
        console.error('認証できないよ');
        return;
    }
    console.log("Logged in as ".concat(client.user.tag, "."));
});
client.on('interactionCreate', function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var targetVoiceCh, voiceCHMemberNames, shuffledMembers, joinedMembers, sendMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!interaction.isChatInputCommand()) {
                    return [2 /*return*/];
                }
                if (interaction.commandName !== 'gacha') {
                    return [2 /*return*/];
                }
                targetVoiceCh = interaction.channel;
                if (!(targetVoiceCh === null || targetVoiceCh.type !== discord_js_1.ChannelType.GuildVoice)) return [3 /*break*/, 2];
                return [4 /*yield*/, interaction.reply('ボイスチャンネル以外では使えないよ')];
            case 1:
                _a.sent();
                return [2 /*return*/];
            case 2:
                voiceCHMemberNames = targetVoiceCh.members.map(function (member) { return member.user.username; });
                shuffledMembers = shuffleArray(voiceCHMemberNames);
                joinedMembers = shuffledMembers
                    .map(function (member, index) { return "".concat(index + 1, ". ").concat(member); })
                    .join('\n');
                sendMessage = joinedMembers || 'ボイスチャンネルのメンバーを取得できなかったよ';
                // メッセージを返す
                return [4 /*yield*/, interaction.reply(sendMessage)
                        .catch(function (err) {
                        console.error(err);
                    })];
            case 3:
                // メッセージを返す
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// 与えられた配列をシャッフルして返す
var shuffleArray = function (array) {
    for (var i = array.length - 1; 0 < i; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
};
var token = process.env.DISCORD_TOKEN;
client.login(token);
