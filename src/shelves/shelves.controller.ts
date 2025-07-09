import { JwtGuard } from '@/auth/guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { CreateShelvesDto } from './dto';
import { ShelvesService } from './shelves.service';

@UseGuards(JwtGuard)
@Controller('shelves')
export class ShelvesController {
  constructor(private shelvesService: ShelvesService) {}

  @Post('create')
  createShelf(@GetUser('uid') userId: number, @Body() dto: CreateShelvesDto) {
    return this.shelvesService.createShelf(userId, dto);
  }
}
