import { Injectable } from '@nestjs/common';
import db from '../config/db/database';
import { CreateShelvesDto } from './dto';

@Injectable()
export class ShelvesService {
  async createShelf(userId: number, dto: CreateShelvesDto) {
    const user = await db('users').where('uid', userId).first();
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const [shelf] = await db('shelves')
      .insert({ user_id: userId, name: dto.name, description: dto.description })
      .returning('*');
    console.log('Shelf', shelf);

    return shelf;
  }
}
