import { IsOptional, IsString } from 'class-validator';

export class CreateShelvesDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
