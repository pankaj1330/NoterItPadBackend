import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserServices } from "./user.service";
import { LoginUserDTO, signUpUserDTO, updatePasswordDT0 } from "./dto/user.dto";


@Controller('user')
export class UserController {

    constructor(private readonly userService : UserServices){}

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Post('/login')
    loginUser(@Body() userLogin : LoginUserDTO){
        return this.userService.loginUser(userLogin);
    }

    @Post('/signup')
    createUser(@Body() userSignup : signUpUserDTO){
        return this.userService.signupUser(userSignup);
    }

    @Post('/changePassword')
    changePassword(@Body() updatePassword : updatePasswordDT0){
        return this.userService.updatePassword(updatePassword);
    }
    
}