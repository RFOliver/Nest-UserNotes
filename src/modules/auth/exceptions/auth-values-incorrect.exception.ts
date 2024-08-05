import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/app.exception";

export class AuthValueIncorrectException extends AppException {
    constructor() {
        super({
            message: "E-mail ou senha incorretos",
            status: HttpStatus.UNAUTHORIZED
        })
    }
}