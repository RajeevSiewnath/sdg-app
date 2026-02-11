import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(createProductDto: CreateProductDto) {
    throw new NotImplementedException();
  }

  async findAll() {
    const relations = ['alignments', 'alignments.sdg', 'company'];

    const treeRepo = this.repo.manager.getTreeRepository(Product);

    const roots = await treeRepo.findRoots({
      relations,
    });

    const trees = await Promise.all(
      roots.map((root) => treeRepo.findDescendantsTree(root, { relations })),
    );

    const attachParent = (product: Product, parent: Product | null = null) => {
      product.parent = parent || undefined;
      if (product.children) {
        for (const child of product.children) {
          attachParent(child, product);
        }
      }
    };

    trees.forEach((root) => attachParent(root));

    return trees;
  }

  findOne(id: number) {
    throw new NotImplementedException();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    throw new NotImplementedException();
  }

  remove(id: number) {
    throw new NotImplementedException();
  }
}
