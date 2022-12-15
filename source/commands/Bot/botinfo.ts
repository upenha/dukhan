import { Command } from '@sapphire/framework';
import { intlFormat } from 'date-fns'
import { Embed } from '../../structures/Embed';
import { getEmoji } from '../../utils/getEmoji';

export class UserCommand extends Command {
	constructor(context: Command.Context) {
		super(context, {
			description: 'fodase!',
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description
		});
	}
	public async chatInputRun(interaction: Command.ChatInputInteraction) {
    let embed = new Embed(interaction.user)
      .setTitle(`${this.container.client.user?.username} | Informations!`)
      .setDescription(``)
      .addFields([
        { name: `${getEmoji('code')?.toString()} Created in:`, value: `Typescript`, inline: true },
        { name: `${getEmoji('code')?.toString()} Version:`, value: `0.0.1`, inline: true },
        { name: `\u200B`, value: `\u200B`, inline: true },
        { name: `${getEmoji('ping')?.toString()} Latency:`, value: `${this.container.client.ws.ping}ms`, inline: true },
        { name: `${getEmoji('team')?.toString()} Members:`, value: `${this.container.client.users.cache.size} members`, inline: true },
        { name: `${getEmoji('team')?.toString()} Guilds:`, value: `${this.container.client.guilds.cache.size} guilds`, inline: true },
      ])
      .setThumbnail(this.container.client.user!.displayAvatarURL({ size: 4096}))
		return await interaction.reply({
			embeds: [
				embed
			]
		});
	}
}
