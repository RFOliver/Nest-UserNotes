import { makeUser } from "src/modules/user/factories/user.factory"
import { NoteRepositoryInMemory } from "../../repositories/note.repository.memory"
import { GetManyNotesUseCase } from "./get-many.use-case"
import { makeNote } from "../../factories/note.factory"
import { NotFoundException, UnauthorizedException } from "@nestjs/common"
import { Note } from "../../entities/note.entitie"

let noteRepositoryInMemory: NoteRepositoryInMemory
let getManyNotesUseCase: GetManyNotesUseCase

describe("Get note", () => {

    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory()
        getManyNotesUseCase = new GetManyNotesUseCase(noteRepositoryInMemory)
    })

    it("Should be able to get many notes", async () => {
        const user = makeUser({})
        const notes = [ ...new Array(10)].map( ()=>makeNote({userId: user.id}))

        noteRepositoryInMemory.notes = notes

        const result = await getManyNotesUseCase.execute({
            userId: user.id,
        });

        expect(result).toEqual(notes)
    });

    it("Should be able to get only user notes", async () =>{
        const user1 = makeUser({})
        const user2 = makeUser({})

        const notes = [ ...new Array(10)].map( (_,index)=>makeNote({userId: index < 5 ? user1.id : user2.id}))

        noteRepositoryInMemory.notes = notes

        const result = await getManyNotesUseCase.execute({
            userId: user1.id,
        });

        expect(result).toHaveLength(5)
    })

    it("Shold be able to control notes per page", async () => {
        const user = makeUser({})
        const notes = [ ...new Array(10)].map( ()=>makeNote({userId: user.id}))

        noteRepositoryInMemory.notes = notes

        const result = await getManyNotesUseCase.execute({
            userId: user.id,
            perPage: "8"
        });

        expect(result).toHaveLength(8)
    })

    it("Should be able to control note page" , async () => {
        const user = makeUser({})
        const notes = [ ...new Array(10)].map( (_, index)=>makeNote({userId: user.id, title: index < 5 ? "Page 1" : "Page 2"}))

        noteRepositoryInMemory.notes = notes

        let result : Note[];

        result = await getManyNotesUseCase.execute({
            userId: user.id,
            page: "1",
            perPage: "5"
        });

        expect(result[0].title).toEqual("Page 1")

        result = await getManyNotesUseCase.execute({
            userId: user.id,
            page: "2",
            perPage: "5"
        });

        expect(result[0].title).toEqual("Page 2")
    })
})