// src/seeds/seed.ts
import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { Sdg } from 'src/sdg/entities/sdg.entity';
import { faker } from '@faker-js/faker';
import { Company } from 'src/company/entities/company.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Alignment,
  AlignmentLevel,
} from 'src/alignment/entities/alignment.entity';

async function seed() {
  await AppDataSource.initialize();

  const sdgRepo = AppDataSource.getRepository(Sdg);
  const companyRepo = AppDataSource.getRepository(Company);
  const productRepo = AppDataSource.getRepository(Product);
  const alignmentRepo = AppDataSource.getRepository(Alignment);

  const sdgs: Array<Sdg> = [];
  for (let i = 0; i < 12; i++) {
    const sdg = sdgRepo.create();
    sdg.name = faker.word.words(5);
    sdgs.push(await sdgRepo.save(sdg));
  }

  const companies: Array<Company> = [];
  for (let i = 0; i < 10; i++) {
    const company = companyRepo.create();
    company.name = faker.company.name();
    companies.push(await companyRepo.save(company));
  }

  const products: Array<Product> = [];
  for (const company of companies) {
    const randomParents: Array<Product> = [];
    for (let i = 0; i < 10; i++) {
      const product = productRepo.create();
      product.weight = faker.number.int({ min: 1, max: 100 });
      product.name = faker.commerce.product();
      product.company = Promise.resolve(company);
      product.parent =
        Math.random() < 0.1 || randomParents.length === 0
          ? undefined
          : faker.helpers.arrayElement(randomParents);
      const saved = await productRepo.save(product);
      products.push(saved);
      randomParents.push(saved);
    }
  }

  for (const product of products) {
    const sdgSet = faker.helpers.arrayElements(sdgs, {
      min: 0,
      max: 1,
    });
    for (const sdgEntry of sdgSet) {
      const alignment = alignmentRepo.create();
      alignment.alignment = faker.helpers.arrayElement(
        Object.values(AlignmentLevel),
      );
      alignment.product = product;
      alignment.sdg = sdgEntry;
      await alignmentRepo.save(alignment);
    }
  }

  await AppDataSource.destroy();
}

seed().catch(console.error);
