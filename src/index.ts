require('dotenv').config()

import type {
  GuildMember,
  Interaction,
  VoiceChannel,
  VoiceBasedChannel,
} from 'discord.js'
import { Client, GatewayIntentBits, ChannelType } from 'discord.js'

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
})

/**
 * 接続確認のために bot 名を表示
 */
client.once('ready', () => {
  if (!client.user) {
    console.error('認証できないよ')
    return
  }
  console.log(`Logged in as ${client.user.tag}.`)
})

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) {
    return
  }

  if (interaction.commandName !== 'gacha') {
    return
  }

  // 目的のボイスチャンネルを特定
  const targetVoiceCh = interaction.channel

  // targetVoiceCh の型がおかしく、ボイスチャンネルが入ってくることが想定されていないため ts-ignore する.
  // 動作に支障はない.
  // @ts-ignore
  if (targetVoiceCh === null || targetVoiceCh.type !== ChannelType.GuildVoice) {
    await interaction.reply('ボイスチャンネル以外では使えないよ')
    return
  }

  // 参加中の voice チャンネルの参加者全員の名前を取得
  const voiceCHMemberNames: string[] = (
    targetVoiceCh as VoiceChannel
  ).members.map((member: GuildMember) => member.user.username)

  // ランダムに並び替える
  const shuffledMembers = shuffleArray(voiceCHMemberNames)

  // リストにしてテキストチャンネルに送信する
  const joinedMembers = shuffledMembers
    .map((member: string, index: number) => `${index + 1}. ${member}`)
    .join('\n')

  const sendMessage =
    joinedMembers || 'ボイスチャンネルのメンバーを取得できなかったよ'

  // メッセージを返す
  await interaction.reply(sendMessage)
      .catch(err => {
        console.error(err)
      })
})

// 与えられた配列をシャッフルして返す
const shuffleArray = (array: string[]): string[] => {
  for (let i = array.length - 1; 0 < i; i--) {
    const r = Math.floor(Math.random() * (i + 1))

    const tmp = array[i]
    array[i] = array[r]
    array[r] = tmp
  }
  return array
}

const token = process.env.DISCORD_TOKEN
client.login(token)
