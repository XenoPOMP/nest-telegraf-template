import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';

import * as LocalSession from 'telegraf-session-local';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
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
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
