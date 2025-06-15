import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {config} from '../config.js'

@Injectable()
export class JwtServices {
    constructor(private jwtService : JwtService){}

    async generateToken(payload : {email: string, id: string | number}){
        const token = await this.jwtService.signAsync(payload);
        if(!token){
            throw new InternalServerErrorException("something went wrong");
        }
        return token;
    }

    validateToken(token : string){
        return this.jwtService.verify(token,{secret : config.JWT_SECRET})
    }
}