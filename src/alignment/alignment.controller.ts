import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlignmentService } from './alignment.service';
import { CreateAlignmentDto } from './dto/create-alignment.dto';
import { UpdateAlignmentDto } from './dto/update-alignment.dto';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { AlignmentDto } from './dto/alignment.dto';

@Controller('alignment')
@Serialize(AlignmentDto)
export class AlignmentController {
  constructor(private readonly alignmentService: AlignmentService) {}

  @Post()
  create(@Body() createAlignmentDto: CreateAlignmentDto) {
    return this.alignmentService.create(createAlignmentDto);
  }

  @Get()
  findAll() {
    return this.alignmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alignmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlignmentDto: UpdateAlignmentDto,
  ) {
    return this.alignmentService.update(+id, updateAlignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alignmentService.remove(+id);
  }
}
