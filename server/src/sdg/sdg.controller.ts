import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SdgService } from './sdg.service';
import { CreateSdgDto } from './dto/create-sdg.dto';
import { UpdateSdgDto } from './dto/update-sdg.dto';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { SdgDto } from './dto/sdg.dto';

@Controller('sdg')
@Serialize(SdgDto)
export class SdgController {
  constructor(private readonly sdgService: SdgService) {}

  @Post()
  create(@Body() createSdgDto: CreateSdgDto) {
    return this.sdgService.create(createSdgDto);
  }

  @Get()
  findAll() {
    return this.sdgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sdgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSdgDto: UpdateSdgDto) {
    return this.sdgService.update(+id, updateSdgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sdgService.remove(+id);
  }
}
