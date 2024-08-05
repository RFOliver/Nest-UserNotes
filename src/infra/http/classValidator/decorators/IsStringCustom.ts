import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	isString,
} from 'class-validator';
import { ExceptionMessage } from './Data/ExceptionsMessage';

export function IsStringCustom(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsStringCustom',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: string) {
					return isString(value);
				},
				defaultMessage(validationArguments: ValidationArguments) {
					return ExceptionMessage.IsString(validationArguments.property);
				},
			},
		});
	};
}
