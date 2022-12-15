import { container, Logger, LogLevel, SapphireClient, SapphireClientOptions} from '@sapphire/framework'
import { Database } from '../database'
import { NewLogger } from './Logger'

export class Client extends SapphireClient {
  constructor(options?: SapphireClientOptions) {
    super({
      ...options,
      logger: {
        level: LogLevel.None,
        // instance: new NewLogger(LogLevel.Info)
      },
      caseInsensitiveCommands: true,
      intents: ['GUILDS', 'GUILD_MESSAGES'],
      partials: ['CHANNEL']
    })
  }

  public async login(token = process.env.DISCORD_TOKEN) {
    return await super.login(token)
  }
}

container.database = new Database()

declare module '@sapphire/pieces' {
  export interface Container {
    database: Database;
  }
}