import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateSdgDto } from './dto/create-sdg.dto';
import { UpdateSdgDto } from './dto/update-sdg.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sdg } from './entities/sdg.entity';

@Injectable()
export class SdgService {
  constructor(@InjectRepository(Sdg) private repo: Repository<Sdg>) {}

  create(createSdgDto: CreateSdgDto) {
    throw new NotImplementedException();
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    throw new NotImplementedException();
  }

  update(id: number, updateSdgDto: UpdateSdgDto) {
    throw new NotImplementedException();
  }

  remove(id: number) {
    throw new NotImplementedException();
  }
}
