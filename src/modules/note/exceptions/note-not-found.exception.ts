import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/app.exception";

export class NoteNotFoundException extends AppException {
    constructor() {
        super({
            message: "Anotação não encontrada",
            status: HttpStatus.NOT_FOUND
        })
    }
}