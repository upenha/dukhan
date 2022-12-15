import { Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class UserListener extends Listener {
	async run(message: Message) {
		if (message.author.bot) return;
		this.container.database.user
			.findUnique({
				where: {
					id: message.author.id,
				},
			})
			.then(async (info: any): Promise<void> => {
				if (info === null) {
					await this.container.database.user.create({
						data: {
							id: message.author.id,
						},
					});
				}
			});
	}
}
