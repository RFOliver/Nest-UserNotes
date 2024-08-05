import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	minLength,
} from 'class-validator';
import { ExceptionMessage } from './Data/ExceptionsMessage';

export function MinLengthCustom(
	min: number,
	validationOptions?: ValidationOptions,
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'MinLengthCustom',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [min],
			options: validationOptions,
			validator: {
				validate(value: unknown) {
					return minLength(value, min);
				},
				defaultMessage(validationArguments: ValidationArguments) {
					return ExceptionMessage.MinLength(validationArguments.property, min);
				},
			},
		});
	};
}
