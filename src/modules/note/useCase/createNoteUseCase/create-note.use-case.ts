import { Injectable } from "@nestjs/common";
import { Note } from "../../entities/note.entitie"
import { NoteRepository } from "../../repositories/note.repository";

interface CreateNoteRequest {
    title: string
    description?: string
    userId: string
}

@Injectable()
export class CreateNoteUseCase{
    constructor(private noteRepository: NoteRepository){}

    async execute( {title,description,userId}: CreateNoteRequest) {

        const note = new Note({
            title,
            description,
            userId
        });

        await this.noteRepository.create(note);

        return note;
    }

}