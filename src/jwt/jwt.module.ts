import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { config } from "config";
import { JwtServices } from "./jwt.service";

@Module({
    imports:[
        JwtModule.register({
            secret: config.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers:[],
    providers:[JwtServices],
})
export class JWTModule {}
