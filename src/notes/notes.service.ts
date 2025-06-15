import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { createNoteDTO, noteParamDTO } from "./dto/notes.dto";
import { Repository } from "typeorm";
import { Notes } from "src/typeorm/entities/Notes";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";

@Injectable()
export class NotesServices {
    constructor(@InjectRepository(Notes) private notesRepo: Repository<Notes>,
        @InjectRepository(User) private userRepo: Repository<User>
    ) { }

    async getAllUserNotes(userId: string) {
        try {
            const ExistingUser = await this.userRepo.findOne({
                where: { id: userId },
                relations: ['notes']
            })
            if (!ExistingUser) {
                throw new NotFoundException("User not found");
            }
            return {
                message: "Success",
                data: {
                    notes: ExistingUser.notes
                },
                statusCode: 200,
            }
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("something went wrong");
        }
    }

    async createNote(newNote: createNoteDTO, userId: string) {
        try {
            const ExistingUser = await this.userRepo.findOne({
                where: { id: userId },
                relations: ['notes']
            })
            if (!ExistingUser) {
                throw new NotFoundException("User not found");
            }
            
            const createNewNote = this.notesRepo.create({
                ...newNote,
                user : ExistingUser,
                createdAt : new Date(),
            })

            await this.notesRepo.save(createNewNote);

            return {
                message : "New Note Created",
                statusCode : 201,
            }
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("something went wrong");
        }
    }

    async updateNote(updatedNote: createNoteDTO, id: string, userId: string) {
        try {
            const ExistingUser = await this.userRepo.findOne({
                where: { id: userId },
                relations: ['notes']
            })
            if (!ExistingUser) {
                throw new NotFoundException("User not found");
            }

            const ExistingNote = ExistingUser.notes.find(note => note.id == id);

            if(!ExistingNote){
                throw new NotFoundException("Note not found");
            }

            ExistingNote.title = updatedNote.title;
            ExistingNote.description = updatedNote.description;

            await this.notesRepo.save(ExistingNote)

            return {
                message : "Note Updated",
                statusCode : 201,
            }
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("something went wrong");
        }
    }

    async deleteNote(id: string, userId: string) {
        try {
            const ExistingUser = await this.userRepo.findOne({
                where: { id: userId },
                relations: ['notes']
            })
            if (!ExistingUser) {
                throw new NotFoundException("User not found");
            }

            const ExistingNote = ExistingUser.notes.find(note => note.id == id);

            if(!ExistingNote){
                throw new NotFoundException("Note not found");
            }

            await this.notesRepo.delete({id : id})

            return {
                message : "Note Deleted",
                statusCode : 201,
            }
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("something went wrong");
        }
    }
}