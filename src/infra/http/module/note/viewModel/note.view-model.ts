import { Note } from "src/modules/note/entities/note.entitie";

export class NoteViewModel {

    static toHttp({createdAt,description,id,title,userId,}:Note) {
        return {
            id,
            title,
            description,
            createdAt
        }
    }

}