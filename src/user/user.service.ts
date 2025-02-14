import { Injectable } from '@nestjs/common';
import db from 'src/config/db/database';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  async editUser(userId: number, dto: EditUserDto) {
    const user = await db('users').where({ uid: userId }).first();
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = await db('users')
      .where({ uid: userId })
      .update(dto)
      .returning(['uid', 'first_name', 'last_name', 'email']);
  }
}
