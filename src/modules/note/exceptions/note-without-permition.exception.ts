import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/app.exception";


export interface NoteWithoutPermisionExceptionProps {
    actionName: string
}
export class NoteWithoutPermisionException extends AppException {
    constructor( { actionName } : NoteWithoutPermisionExceptionProps ) {
        super({
            message: `Sem permissão para ${actionName} esta nota`,
            status: HttpStatus.UNAUTHORIZED
        })
    }
}