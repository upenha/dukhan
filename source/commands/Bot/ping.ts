import { Command } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators'
import { Embed } from '../../structures/Embed';
import { getEmoji } from '../../utils/getEmoji';

@ApplyOptions<Command.Options>({
	description: 'Pong!',
})

export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description
		});
	}
	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		return await interaction.reply({
			embeds: [
				new Embed(interaction.user).setDescription(`${getEmoji('ping')} ${this.container.client.ws.ping}ms`)
			],
			ephemeral: true
		});
	}
}
