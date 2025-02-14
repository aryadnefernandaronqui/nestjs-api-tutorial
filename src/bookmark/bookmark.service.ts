import { Injectable } from '@nestjs/common';
import db from 'src/config/db/database';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const [bookmark] = await db('bookmarks')
      .insert({ user_id: userId, ...dto })
      .returning('*');
    return bookmark;
  }

  getBookmarks(userId: number) {
    const bookmarks = db('bookmarks').where({ user_id: userId });
  }

  getBookmarkById(userId: number, bookmarkId: number) {}

  editBookmarkById(userId: number, dto: EditBookmarkDto, bookmarkId: number) {}

  deleteBookmarkById(userId: number, bookmarkId: number) {}
}
