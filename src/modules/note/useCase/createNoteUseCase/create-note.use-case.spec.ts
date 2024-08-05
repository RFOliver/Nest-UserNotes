import { NoteRepositoryInMemory } from "../../repositories/note.repository.memory"
import { CreateNoteUseCase } from "./create-note.use-case"

let noteRepositoryInMemory: NoteRepositoryInMemory
let createNoteUseCase: CreateNoteUseCase

describe("Create note", () => {

    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory()
        createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory)
    })

    it("Should be able to create note", async () => {
        expect(noteRepositoryInMemory).toEqual([])

        const note = await createNoteUseCase.execute({
            title: "teste",
            userId: 'asdasdas'
        })

        expect(noteRepositoryInMemory).toEqual([note])
    })
})