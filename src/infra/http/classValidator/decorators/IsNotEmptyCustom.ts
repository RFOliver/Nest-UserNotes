import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	isNotEmpty,
} from 'class-validator';
import { ExceptionMessage } from './Data/ExceptionsMessage';

export function IsNotEmptyCustom(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsNotEmptyCustom',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: unknown) {
					return isNotEmpty(value);
				},
				defaultMessage(validationArguments: ValidationArguments) {
					return ExceptionMessage.IsNotEmpty(validationArguments.property);
				},
			},
		});
	};
}
