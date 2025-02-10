import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    //POST /auth/signup
    @Post('signup')
    signUp() {
        return this.authService.signUp()
    }
    //POST /auth/signup
    @Post('signin')
    signIn() {
       return this.authService.signIn()
    }
}