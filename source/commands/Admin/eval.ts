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
		const value = interaction.options.getString('code');
		const { result, success, time } = await this.eval(interaction, value!)

    const embed = new Embed(interaction.user);
		embed.addFields(
			{
				name: 'Entrada',
				value: `\`\`\`ts\n${value}\`\`\``,
				inline: false,
			},
			{
				name: 'Saida',
				value: `\`\`\`json\n${result}\`\`\``,
				inline: false,
			},
			{
				name: 'Tempo (em milisegundos)',
				value: `\`\`\`${time}ms\`\`\``,
				inline: false,
			}
		);

		interaction.reply({ content: interaction.user.toString(), embeds: [embed], ephemeral: true });
	}

  public async eval(
		message: Command.ChatInputInteraction,
		code: string
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
