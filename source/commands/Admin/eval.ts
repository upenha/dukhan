import { Command } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators'
import { Embed } from '../../structures/Embed';
import { getEmoji } from '../../utils/getEmoji';

@ApplyOptions<Command.Options>({
	description: 'Eval!',
  preconditions: ['TeamOnly'],
})

export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption((option) => {
					return option
						.setName('code')
						.setRequired(true)
						.setDescription('eval');
				})
    )
	}
	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		await interaction.deferReply({ ephemeral: true })
		const value = interaction.options.getString('code')!;
		const { result } = await this.eval(interaction, value)
		interaction.editReply({ content: `${interaction.user.toString()} \`\`\`${result}\`\`\`` });
	}
	public async eval(
		message: Command.ChatInputInteraction,
		code: string,
	) {
		let time = Date.now();
		let success = true;
		let result;
		try {
			result = await JSON.stringify(await eval(code), null, 2);
		} catch (error) {
			if (error && error instanceof Error && error.stack) {
				console.log(error);
			}
			result = error;
			success = false;
		}
		time = Date.now() - time;
		return { result, success, time };
	}
}
