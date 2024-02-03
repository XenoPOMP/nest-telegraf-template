import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';

import * as LocalSession from 'telegraf-session-local';
import * as process from 'process';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TelegrafModule.forRoot({
			middlewares: [sessions.middleware()],
			token: process.env.TG_TOKEN,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
