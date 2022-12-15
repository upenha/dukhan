import { Command } from '@sapphire/framework';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

export class UserCommand extends Command {
	constructor(context: Command.Context) {
		super(context, {
			description: 'bulkCommand',
			// preconditions: ['TeamOnly'],
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder.setName(this.name).setDescription(this.description)
		);
	}
	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		// @ts-ignore
		const rest = new REST({ version: '10' }).setToken(
			process.env.DISCORD_TOKEN
		);
		rest.put(Routes.applicationCommands('1052806253556011068'), {
			body: [],
		})
			.then(() =>
				console.log('Successfully deleted all application commands.')
			)
			.catch(console.error);
	}
}
