import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserServices } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { JWTModule } from "src/jwt/jwt.module";

@Module({
    imports : [TypeOrmModule.forFeature([User]),JWTModule],
    controllers : [UserController],
    providers : [UserServices]
})
export class UserModule {}