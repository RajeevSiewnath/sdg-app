import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private repo: Repository<Company>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    throw new NotImplementedException();
  }

  async findAll() {
    const companies = await this.repo.find({ relations: ['products'] });
    const relations = ['alignments', 'alignments.sdg', 'company'];
    const treeRepo = this.productRepo.manager.getTreeRepository(Product);

    for (const company of companies) {
      const roots = await this.productRepo.find({
        where: {
          parent: IsNull(),
          company,
        },
        relations,
      });
      await Promise.all(
        roots.map((root) =>
          treeRepo.findDescendantsTree(root, {
            relations,
          }),
        ),
      );
      company.products = roots;
    }

    return companies;
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
