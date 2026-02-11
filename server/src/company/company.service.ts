import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private repo: Repository<Company>) {}

  create(createCompanyDto: CreateCompanyDto) {
    throw new NotImplementedException();
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    throw new NotImplementedException();
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    throw new NotImplementedException();
  }

  remove(id: number) {
    throw new NotImplementedException();
  }
}
