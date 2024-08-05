import { Module } from "@nestjs/common";
import { NoteViewModel } from "./viewModel/note.view-model";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateNoteUseCase } from "src/modules/note/useCase/createNoteUseCase/create-note.use-case";
import { EditNoteUseCase } from "src/modules/note/useCase/editNoteUseCase/edit-note.use-case";
import { DeleteNoteUseCase } from "src/modules/note/useCase/deleteNoteUseCase/delete-note.use-case";
import { GetNoteUseCase } from "src/modules/note/useCase/getNoteUseCase/get-note.use-case";
import { GetManyNotesUseCase } from "src/modules/note/useCase/getManyUseCase/get-many.use-case";
import { NoteController } from "./note.controller";

@Module({
    controllers: [NoteController],
    imports: [DatabaseModule],
    providers: [
        CreateNoteUseCase,
        EditNoteUseCase,
        DeleteNoteUseCase,
        GetNoteUseCase,
        GetManyNotesUseCase,
    ]
}
)
export class NoteModule {

}