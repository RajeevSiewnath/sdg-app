import { Module } from '@nestjs/common';
import { AlignmentService } from './alignment.service';
import { AlignmentController } from './alignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alignment } from './entities/alignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alignment])],
  controllers: [AlignmentController],
  providers: [AlignmentService],
})
export class AlignmentModule {}
