import { Note } from "../entities/note.entitie";

type Override = Partial<Note>

export const makeNote = ({ id, ...override}: Override) => {
    return new Note({
        title: 'teste',
        description: 'desc teste',
        userId: "asdasdasdas",
        ...override,
    },
    id,
);
}