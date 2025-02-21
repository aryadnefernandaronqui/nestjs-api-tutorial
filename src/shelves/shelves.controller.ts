import { JwtGuard } from '@/auth/guard';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { CreateShelvesDto } from './dto';
import { ShelvesService } from './shelves.service';

@UseGuards(JwtGuard)
@Controller('shelves')
export class ShelvesController {
  constructor(private shelvesService: ShelvesService) {}

  @Post('create')
  createShelf(@GetUser('uid') userId: number, @Body() dto: CreateShelvesDto) {}

  //   @Get('shelf')
  //   getShelfr(@GetShelf() shelf: any) {
  //     return shelf;
  //   }

  //   @Patch()
  //   editShelf(
  //     @GetShelf('uid')
  //     userId: number,
  //     @Body() dto: EditUserDto,
  //   ) {
  //     return this.shelvesService.editShelf(userId, dto);
  //   }
}
