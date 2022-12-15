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
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName('amount')
            .setMinValue(100)
            .setDescription('quantidade')
            .setMaxValue(100000)
            .setRequired(true)
        )
    )
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction) {
    let user = await interaction.options.getUser('user')!
    let amount = await interaction.options.getInteger('amount')!
    if(user.bot) return interaction.reply('The user is a bot, please try with a real user!')
    if(user === interaction.user) return interaction.reply('You can\'t pay yourself!')

		let payerDb = await this.container.database.user.findFirst({
      where: {
        id: interaction.user.id
      }
    })
    if(amount > payerDb?.coins!) return interaction.reply('You don\'t have this amount of coins.')

		let receiverDb = await this.container.database.user.findFirst({
      where: {
        id: user.id
      }
    })

    payerDb = await this.container.database.user.update({
      where: {
        id: interaction.user.id
      },
      data: {
        coins: {
          decrement: amount
        }
      }
    })

    
    receiverDb = await this.container.database.user.update({
      where: {
        id: user.id
      },
      data: {
        coins: {
          increment: amount
        }
      }
    })
    return interaction.reply({
      embeds: [
        new Embed(user).setDescription(`Transaction made! The amount that you selected will be transferred to ${user}!`)
      ]
    })

  }
}
