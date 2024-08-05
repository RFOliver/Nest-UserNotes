import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { IncorrectValuesException } from './exceptions/incorrect-values.exception';
import { mapperClassValidationErrorToAppException } from './utils/mapper';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory(errors: ValidationError[]) {
				throw new IncorrectValuesException({
					fields: mapperClassValidationErrorToAppException(errors),
				});
			},
		}),
	);
	await app.listen(3000);
}
bootstrap();
