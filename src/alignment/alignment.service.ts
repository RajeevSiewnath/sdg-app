import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateAlignmentDto } from './dto/create-alignment.dto';
import { UpdateAlignmentDto } from './dto/update-alignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alignment } from './entities/alignment.entity';

@Injectable()
export class AlignmentService {
  constructor(
    @InjectRepository(Alignment) private repo: Repository<Alignment>,
  ) {}

  create(createAlignmentDto: CreateAlignmentDto) {
    throw new NotImplementedException();
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    throw new NotImplementedException();
  }

  update(id: number, updateAlignmentDto: UpdateAlignmentDto) {
    throw new NotImplementedException();
  }

  remove(id: number) {
    throw new NotImplementedException();
  }
}
