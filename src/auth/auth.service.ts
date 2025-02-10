import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{

    signUp(){
        return {msg: 'I have SignUp'}
    }

    signIn(){
        return {msg: 'I have SignIn'}
    }
}