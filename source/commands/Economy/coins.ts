import { User } from '@prisma/client';
import { Command } from '@sapphire/framework';
import { formatDistance, differenceInHours, differenceInSeconds, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Message } from 'discord.js';
import { Embed } from '../../structures/Embed';
import { getEmoji } from '../../utils/getEmoji';

export class UserCommand extends Command {
	constructor(context: Command.Context) {
		super(context, {
			description: 'fodase!',
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addUserOption((option) => 
          option
            .setName('user')
            .setDescription('User teste')
            .setRequired(false)
        )
    )
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction) {
    let user = await interaction.options.getUser('user') || interaction.user
		let userDb = await this.container.database.user.findFirst({
      where: {
        id: user.id
      }
    })
    return interaction.reply({
      embeds: [
        new Embed(user).setDescription(`${user} has \`${userDb?.coins}\` coins`)
      ]
    })

  }
}
