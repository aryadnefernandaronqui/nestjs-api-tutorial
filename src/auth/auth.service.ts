import { Injectable } from "@nestjs/common";
import * as argon from 'argon2';
import db from "src/config/db/database";
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService{

    async signUp(dto: AuthDto){
        //generate the password hash
        const hash = await argon.hash(dto.password);
        //save the new user in the db

      const user = await db('users').insert({
    email: dto.email,
    hash
}).returning('*')

        //return the saved user
        return user
    }

    signIn(){
        return {msg: 'I have SignIn'}
    }
}