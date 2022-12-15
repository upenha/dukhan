import { Listener } from '@sapphire/framework'
import { cyan } from 'colorette'

export class UserListener extends Listener {
  async run() {
		console.info(cyan('[BOT]     '), 'online!')
    this.container.client.user?.setPresence({
      activities: [
        {
          name: `${this.container.client.users.cache.size} users!`, type: 'WATCHING'
        }
      ],
      status: 'online'
    })
  }
}