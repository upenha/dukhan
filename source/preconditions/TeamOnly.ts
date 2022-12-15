import { Precondition } from '@sapphire/framework';
import type { CommandInteraction, User } from 'discord.js';
import { Team } from 'discord.js';

export class UserPrecondition extends Precondition {

	public async chatInputRun(interaction: CommandInteraction) {
		return this.checkUser(interaction.user.id);
	}

  // public checkTeam(userId: string) {
	// 	const applicationTeam = this.container.client.application
	// 		?.owner as Team;
	// 	if (applicationTeam.members.get(userId)) {
	// 		return this.ok();
	// 	} else
	// 		return this.error({
	// 			message: 'Only team members can use this!',
	// 		});
	// }

	public checkUser(userId: string) {
		const applicationOwner = this.container.client.application
			?.owner as User;
		if (applicationOwner.id === userId) {
			return this.ok();
		} else
			return this.error({
				message: 'Only team members can use this!',
			});
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		TeamOnly: never;
	}
}