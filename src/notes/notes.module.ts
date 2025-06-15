import { Module } from "@nestjs/common";
import { NotesController } from "./notes.controller";
import { NotesServices } from "./notes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notes } from "src/typeorm/entities/Notes";
import { JWTModule } from "src/jwt/jwt.module";
import { User } from "src/typeorm/entities/User";

@Module({
    imports:[TypeOrmModule.forFeature([Notes,User]),JWTModule],
    controllers:[NotesController],
    providers:[NotesServices],
    exports:[]
})
export class NotesModule {

}