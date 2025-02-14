import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import db from '../config/db/database';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);
    //save the new user in the db

    try {
      const users = await db('users')
        .insert({
          email: dto.email,
          password: hash,
          first_name: dto.first_name,
          last_name: dto.last_name,
        })
        .returning(['uid', 'first_name', 'last_name', 'email']);

      const user = users[0];

      if (!user || !user.uid) {
        throw new ForbiddenException('Invalid user data');
      }

      return this.signToken(user.uid, user.email);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ForbiddenException('User already exists');
      }
      throw error;
    }
  }

  async signIn(dto: AuthDto) {
    //find the user by email
    const user = await db('users').where({ email: dto.email }).first();
    //if user doesn't exist throw exception
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    //compare password
    const pwMatches = await argon.verify(user.password, dto.password);
    //if password is incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Password incorrect');
    }

    if (!user.uid) {
      throw new ForbiddenException('Invalid user data');
    }

    //return the user
    return this.signToken(user.uid, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get<string>('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '120m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
