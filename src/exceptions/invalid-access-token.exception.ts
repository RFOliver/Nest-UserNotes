import { HttpStatus } from '@nestjs/common';
import { AppException, AppExceptionProps } from './app.exception';

export class IncorrectAccessToken extends AppException {
	constructor() {
		super({
			message: 'Token de acesso inválido',
			status: HttpStatus.UNAUTHORIZED,
		});
	}
}
