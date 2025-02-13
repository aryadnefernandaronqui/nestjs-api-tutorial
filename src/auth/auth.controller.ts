import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    

    //POST /auth/signup
    @Post('signup')
    signUp(@Body() dto: AuthDto) {
        // const dto: AuthDto = { email, password }
       console.log(dto);
       
        return this.authService.signUp(dto)
    }


    //POST /auth/signup
    @Post('signin')
    signIn() {
       return this.authService.signIn()
    }
}