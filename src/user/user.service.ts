import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoginUserDTO, signUpUserDTO, updatePasswordDT0, userDTO } from "./dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtServices } from "src/jwt/jwt.service";

@Injectable()
export class UserServices {
    // private users : userDTO[] = [];

    constructor(@InjectRepository(User) private userRepo : Repository<User>,
        private jwtService: JwtServices,
    ){}

    async getAllUsers(){
        return await this.userRepo.find();
    }

    async signupUser(user : signUpUserDTO){
        try{
            const email = user?.email;

            const isUserExist = await this.userRepo.findOne({ where: { email } });
            if(isUserExist){
                throw new BadRequestException("Email already exist");
            }
            
            const hashedPassword = await bcrypt.hash(user.password, 10);

            const newUser = this.userRepo.create({
                ...user,
                password:hashedPassword,
                createdAt:new Date()
            })
            this.userRepo.save(newUser);

            return {
                    message: "Signup Success",
                    statusCode: 201,
                }
        }
        catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Something went wrong during signup');
        }
    }

    async loginUser(user : LoginUserDTO){
        try{
            const email = user?.email;
            const ExistingUser = await this.userRepo.findOne({where : {email}});
            if(!ExistingUser){
                throw new NotFoundException("User Not Found");
            }
            const isPasswordValid = await bcrypt.compare(user.password, ExistingUser.password);
            if(!isPasswordValid){
                throw new BadRequestException("Invalid Credentials")
            }
            const token = await this.jwtService.generateToken({ id: ExistingUser.id, email: user.email });
            return {
                    message: "Login Success",
                    username : ExistingUser?.name,
                    access_token : token,
                    statusCode: 201,
                }
        }
        catch(error) {
            if(error instanceof BadRequestException || error instanceof NotFoundException){
                throw error;
            }
            throw new InternalServerErrorException("something went wrong during login");
        }
    }

    async updatePassword(user: updatePasswordDT0){
        try{
            const email = user?.email;
            const newPassword = user?.newPassword;
            const ExistingUser = await this.userRepo.findOne({where : {email}});
            if(!ExistingUser){
                throw new NotFoundException("User Not Found");
            }

            const isPasswordValid = await bcrypt.compare(user.password, ExistingUser.password);

            if(!isPasswordValid){
                throw new BadRequestException("Invalid old password");
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await this.userRepo.update(
                {email : email},
                {password : hashedPassword}
            )
            return {
                message : "Password updated",
                statusCode : 201
            }
        }
        catch(error){
            if(error instanceof BadRequestException || error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException("something went wrong");
        }
    }
}