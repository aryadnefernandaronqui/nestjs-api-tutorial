import { Injectable } from '@nestjs/common';
import db from 'src/config/db/database';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  async createBookmark(
    userId: number,
    shelfId: number,
    dto: CreateBookmarkDto,
  ) {
    const user = await db('users').where('uid', userId).first();
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    console.log('user in bookmark', user);

    if (shelfId) {
      const shelf = await db('shelves').where('uid', shelfId).first();
      if (!shelf) {
        throw new Error('Shelf não encontrado');
      }
    }

    const [bookmark] = await db('bookmarks')
      .insert({
        user_id: userId,
        title: dto.title,
        description: dto.description,
        link: dto.link,
        genre: dto.genre,
        author: dto.author,
        shelfId: shelfId || null,
      })
      .returning('*');
    console.log('Book', bookmark);

    return bookmark;
  }

  getBookmarks(userId: number) {
    const bookmarks = db('bookmarks').where({ user_id: userId });
  }

  getBookmarkById(userId: number, bookmarkId: number) {}

  editBookmarkById(userId: number, dto: EditBookmarkDto, bookmarkId: number) {}

  deleteBookmarkById(userId: number, bookmarkId: number) {}
}
