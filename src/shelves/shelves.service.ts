import { Injectable } from '@nestjs/common';
import { CreateShelvesDto } from './dto/shelves.dto';

@Injectable()
export class ShelvesService {
  async createShelf(userId: number, dto: CreateShelvesDto) {}

  //   async editUser(userId: number, dto: EditUserDto) {
  //     const user = await db('users').where({ uid: userId }).first();
  //     if (!user) {
  //       throw new Error('User not found');
  //     }
  //     const updatedUser = await db('users')
  //       .where({ uid: userId })
  //       .update(dto)
  //       .returning(['uid', 'first_name', 'last_name', 'email']);
  //   }
}
