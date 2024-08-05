import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ValidateUserBody } from '../dtos/validade-user-body';
import { validate } from 'class-validator';
import { IncorrectValuesException } from 'src/exceptions/incorrect-values.exception';
import { mapperClassValidationErrorToAppException } from 'src/utils/mapper';

@Injectable()
export class ValidateUserDTOMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		const body = req.body;

		const validateUserBody = new ValidateUserBody();
		validateUserBody.email = body.email;
		validateUserBody.password = body.password;

		const validations = await validate(validateUserBody);

		if (validations.length) {
			throw new IncorrectValuesException({
				fields: mapperClassValidationErrorToAppException(validations),
			});
		}

		next();
	}
}
