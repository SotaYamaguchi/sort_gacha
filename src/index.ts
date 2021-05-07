require('dotenv').config()
import {
  Client,
  GuildChannel,
  GuildMember,
  Message,
  User,
  VoiceChannel
} from "discord.js"
const client = new Client()

// bot 名を確認のために表示
client.on('ready', () => {
  if (!client.user) {
    console.error('認証できないよ')
    return
  }
  console.log(`Logged in as ${client.user.tag}.`)
})

// チャット欄のコメントを受け取る処理
client.on('message', (message: Message) => {
  if (!message.guild) {
    console.error('ギルドがないよ')
    return
  }

  // コメントしたメンバー
  const author: User = message.author

  if (message.content === '!gacha') {
    const channels = message.guild.channels
    const voiceCH = channels.cache.find((ch: GuildChannel) => {
      if (ch.type !== 'voice') {
        return false
      }
      // ボイスチャンネルのうち、コメントしたメンバーがいるチャンネルを取得
      return !!ch.members.filter((member: GuildMember) => member.user.id === author.id)
    }) as VoiceChannel
    
    if (!voiceCH) {
      console.error('チャンネルがみっかんないよ')
      return
    }

    // voice チャンネルに参加しているメンバー一覧を取得
    const voiceCHMemberNames: string[] = voiceCH.members
      .map(member => member.user.username)
    const shuffledMembers = shuffleArray(voiceCHMemberNames)

    // リストにしてテキストチャンネルに送信する
    const joinedMembers = shuffledMembers
      .map((member: string, index: number) => `${index + 1}. ${member}`)
      .join('\n')

    const sendMessage = joinedMembers || 'ボイスチャンネルのメンバーを取得できなかったよ'

    message.channel.send(sendMessage)
  }
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