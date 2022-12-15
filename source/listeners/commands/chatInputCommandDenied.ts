import { ChatInputCommandDeniedPayload, Listener, UserError } from '@sapphire/framework'
import { Embed } from '../../structures/Embed';

export class UserListener extends Listener {
  public async run({ context, message: content }: UserError, { interaction }: ChatInputCommandDeniedPayload) {
		// if (Reflect.get(Object(context), 'silent')) return;

    return interaction.reply({
			embeds: [
        new Embed(interaction.user).setDescription(content)
      ],
			allowedMentions: { users: [interaction.user.id], roles: [] },
			ephemeral: true
		});
  }
}