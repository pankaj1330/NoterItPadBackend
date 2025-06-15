import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { NotesServices } from "./notes.service";
import { createNoteDTO, noteParamDTO } from "./dto/notes.dto";
import { JwtAuthGuard } from "src/jwt/jwt.guard";

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
    constructor(private notesService : NotesServices){}

    @Get()
    getNotesList(@Req() request: AuthRequest){
        const userId = request.user?.id;
        return this.notesService.getAllUserNotes(userId);
    }

    @Post('/create')
    createNote(@Req() request: AuthRequest,@Body() newNote : createNoteDTO){
        const userId = request.user?.id;
        return this.notesService.createNote(newNote,userId);
    }

    @Patch('/update/:id')
    updateNote(@Req() request: AuthRequest, @Body() updatedNote : createNoteDTO, @Param('id') id : string){
        const userId = request.user?.id;
        return this.notesService.updateNote(updatedNote,id,userId);
    }

    @Patch('/delete/:id')
    deleteNote(@Req() request: AuthRequest, @Param('id') id : string){
        const userId = request.user?.id;
        return this.notesService.deleteNote(id,userId);
    }
}