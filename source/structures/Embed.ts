import { MessageEmbed, MessageEmbedOptions, User } from 'discord.js';

export class Embed extends MessageEmbed {
	constructor(user?: User) {
		super();
		if (user) this.setFooter({ text: user?.username, iconURL: user?.displayAvatarURL({ dynamic: true}) })
		
		this.setColor('#2f3136');
		this.setTimestamp();
	}
}
