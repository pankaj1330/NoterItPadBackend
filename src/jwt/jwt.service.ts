import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {config} from '../../config.js'

@Injectable()
export class JwtServices {
    constructor(private jwtService : JwtService){}

    generateToken(payload : {email: string, id: string}){
        return this.jwtService.sign(payload);
    }

    validateToken(token : string){
        return this.jwtService.verify(token,{secret : config.JWT_SECRET})
    }
}