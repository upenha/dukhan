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
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description,
		});
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		let userDb = await this.container.database.user.findFirst({
      where: {
        id: interaction.user.id
      }
    })

    if(userDb?.lastDaily === null) return this.successDaily(interaction, userDb)
    if(differenceInSeconds(Date.now(), userDb!.lastDaily!) <= 24 * 60 * 60) return this.errorDaily(interaction, userDb!)
    
    this.successDaily(interaction, userDb!)
	}

  
  private async errorDaily(interaction: Command.ChatInputInteraction, userDb: User) {
    return interaction.reply({
      embeds: [
        new Embed(interaction.user).setDescription(
          `${getEmoji('time')?.toString()} Come back in \`${formatDistance(Date.now(), addHours(userDb.lastDaily!, 24), { addSuffix: false })}\` to collect more coins!`
        )
      ],
      ephemeral: true
    })
  }

  private async successDaily(interaction: Command.ChatInputInteraction, userDb: User) {
    let dailyCoins = Math.floor(Math.random() * (2000 - 1000) + 1000)
    userDb = await this.container.database.user.update({
      where: {
        id: interaction.user.id,
      },
      data: {
        coins: { increment: dailyCoins },
        lastDaily: new Date()
      }
    })

    return interaction.reply({
      embeds: [
        new Embed(interaction.user).setDescription(`Congratulations, you collected ${dailyCoins} coins today! Come back tomorrow to collect more more!`)
      ],
      ephemeral: true
    })
  }
}