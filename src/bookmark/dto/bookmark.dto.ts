import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author?: string;

  @IsString()
  @IsOptional()
  link: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  genre: string;

  @IsOptional()
  @IsUUID()
  shelfId?: number;
}

export class EditBookmarkDto extends CreateBookmarkDto {}
