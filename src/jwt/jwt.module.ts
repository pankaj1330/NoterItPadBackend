import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { config } from "src/config";
import { JwtServices } from "./jwt.service";
import { JwtAuthGuard } from "./jwt.guard";

@Module({
    imports:[
        JwtModule.register({
            secret: config.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers:[],
    providers:[JwtServices,JwtAuthGuard],
    exports:[JwtModule,JwtServices,JwtAuthGuard]
})
export class JWTModule {}
