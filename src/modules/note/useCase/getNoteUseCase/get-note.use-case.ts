import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { NoteRepository } from "../../repositories/note.repository";
import { NoteNotFoundException } from "../../exceptions/note-not-found.exception";
import { NoteWithoutPermisionException } from "../../exceptions/note-without-permition.exception";

interface GetNoteRequest {
    noteId: string;
    userId: string;
}

@Injectable()
export class GetNoteUseCase {
    constructor(private noteRepository: NoteRepository){}

    async execute({noteId, userId} : GetNoteRequest) {

        const note = await this.noteRepository.findById(noteId)

        if(!note) throw new NoteNotFoundException()

        if(note.userId !== userId) throw new NoteWithoutPermisionException( { actionName: "consultar"} )

        return note
    }
}