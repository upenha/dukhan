import { PrismaClient } from '@prisma/client';
import { cyan } from 'colorette';


export class Database extends PrismaClient {
	constructor() {
		super();
		console.info(cyan('[DATABASE]'), 'online!')
	}
}
