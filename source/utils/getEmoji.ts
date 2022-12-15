import { container } from "@sapphire/framework"

export const getEmoji = (emoji: string) => {
  const guild = container.client.guilds.cache.get('967749125829459972')
  const emojiString = guild?.emojis.cache.find(e => e.name === emoji)
  return emojiString
}