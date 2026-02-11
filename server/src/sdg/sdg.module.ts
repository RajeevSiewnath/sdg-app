import { Module } from '@nestjs/common';
import { SdgService } from './sdg.service';
import { SdgController } from './sdg.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sdg } from './entities/sdg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sdg])],
  controllers: [SdgController],
  providers: [SdgService],
})
export class SdgModule {}
