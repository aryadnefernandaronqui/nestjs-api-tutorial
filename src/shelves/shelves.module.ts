import { Module } from '@nestjs/common';
import { ShelvesController } from './shelves.controller';
import { ShelvesService } from './shelves.service';

@Module({
  providers: [ShelvesService],
  controllers: [ShelvesController],
})
export class ShelvesModule {}
