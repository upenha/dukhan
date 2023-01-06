console.clear()
import { red } from 'colorette';
import { textSync } from 'figlet';
import { Client } from './structures/Client';
const client = new Client();

client.login(process.env.DISCORD_TOKEN);
