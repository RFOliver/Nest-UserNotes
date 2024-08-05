export const ExceptionMessage = {
	IsNotEmpty: (property: string) => `O campo ${property} é obrigatório`,
	IsEmail: (property: string) => `O campo ${property} deve ser um e-mail`,
	IsString: (property: string) =>
		`O campo ${property} deve ser estar no formato string`,
	MinLength: (property: string, min: number) =>
		`O campo ${property} deve ter no mínimo ${min} caracteres`,
};
