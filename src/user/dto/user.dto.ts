import { IsDate, IsEmail, IsNotEmpty, isString, IsString, MinLength } from "class-validator";

export class userDTO {
    @IsString()
    id : string;

    @IsString()
    @IsNotEmpty()
    name : string;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password : string;

    @IsDate()
    createdAt : Date;
}

export class LoginUserDTO {
    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    password : string;
}

export class signUpUserDTO {
    @IsString()
    @IsNotEmpty()
    name : string;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password : string;
}

export class updatePasswordDT0 {
    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    password : string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    newPassword : string;
}
