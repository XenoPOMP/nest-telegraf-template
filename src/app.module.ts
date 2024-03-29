import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';

import * as LocalSession from 'telegraf-session-local';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
	imports: [
		ConfigModule.forRoot(),
		TelegrafModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				return {
					middlewares: [sessions.middleware()],
					token: configService.getOrThrow('TG_TOKEN'),
				};
			},
			inject: [ConfigService],
		}),
	],
	controllers: [],
	providers: [AppService, AppUpdate],
})
export class AppModule {}
