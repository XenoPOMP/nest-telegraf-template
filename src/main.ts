import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	require('dotenv').config();

	const { APP_PORT = 4200 } = process.env;

	const app = await NestFactory.create(AppModule, { cors: true });
	await app.listen(APP_PORT);
}
bootstrap();
