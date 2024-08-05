import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { NoteRepository } from "../../repositories/note.repository";
import { NoteNotFoundException } from "../../exceptions/note-not-found.exception";
import { NoteWithoutPermisionException } from "../../exceptions/note-without-permition.exception";

interface EditNoteRequest {
    title: string;
    description?: string;
    noteId: string;
    userId: string;
}

@Injectable()
export class EditNoteUseCase {
    constructor(private noteRepository: NoteRepository){}

    async execute({title, description, noteId, userId} : EditNoteRequest) {

        const note = await this.noteRepository.findById(noteId)

        if(!note) throw new NoteNotFoundException()

        if(note.userId !== userId) throw new NoteWithoutPermisionException( { actionName: "editar"} )

        note.title = title
        note.description = description ?? null

        await  this.noteRepository.save(note)

        return note
    }
}