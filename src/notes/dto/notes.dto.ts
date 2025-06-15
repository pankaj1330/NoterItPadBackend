import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class noteDTO {
    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    createdAt: Date;
}

export class createNoteDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;
}

export class noteParamDTO { 
    @IsString()
    @IsNotEmpty()
    id : string;

}