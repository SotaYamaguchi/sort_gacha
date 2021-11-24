require('dotenv').config()
import {
  Client,
  GuildMember,
  Message,
  VoiceChannel,
} from "discord.js"
const client = new Client()

/**
 * 接続確認のために bot 名を表示
 */
client.on('ready', () => {
  if (!client.user) {
    console.error('認証できないよ')
    return
  }
  console.log(`Logged in as ${client.user.tag}.`)
})

/**
 * チャット欄のコメントを受け取ってメンバーリストを返す処理
 */
client.on('message', (message: Message) => {
  if (!message.guild) {
    console.error('ギルドがないよ')
    return
  }

  // `!gacha` 以外のコマンドだったら無視
  if (message.content !== '!gacha') {
    return
  }

  // 現状のチャンネル一覧から daily_scrum チャンネルを取得
  const voiceChs = client.channels.cache.filter(ch => ch instanceof VoiceChannel)

  // daily_scrum ボイスチャンネルを特定
  // TODO: ボイスチャンネルの型を当てたい
  const targetVoiceCh: any = voiceChs.find((ch: any) => ch.id === '908188153792311297')

  if (!targetVoiceCh) {
    console.error('チャンネルがみっかんないよ')
    return
  }

  // 参加中の voice チャンネルの参加者全員の名前を取得
  const voiceCHMemberNames: string[] = targetVoiceCh.members
    .map((member: GuildMember) => member.user.username)

  // ランダムに並び替える
  const shuffledMembers = shuffleArray(voiceCHMemberNames)

  // リストにしてテキストチャンネルに送信する
  const joinedMembers = shuffledMembers
    .map((member: string, index: number) => `${index + 1}. ${member}`)
    .join('\n')

  const sendMessage = joinedMembers || 'ボイスチャンネルのメンバーを取得できなかったよ'

  // メッセージを返す
  message.channel.send(sendMessage)
})

// 与えられた配列をシャッフルして返す
const shuffleArray = (array: string[]): string[] => {
  for(let i = (array.length - 1); 0 < i; i--){
    var r = Math.floor(Math.random() * (i + 1))

    var tmp = array[i]
    array[i] = array[r]
    array[r] = tmp
  }
  return array
}

const token = process.env.DISCORD_TOKEN
client.login(token)
