import { Alignment } from 'src/alignment/entities/alignment.entity';
import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weight: number;

  @Column()
  name: string;

  @TreeParent()
  parent?: Product;

  @TreeChildren()
  children: Product[];

  @OneToMany(() => Alignment, (alignment) => alignment.product)
  alignments: Alignment[];

  @ManyToOne(() => Company, (company) => company.products)
  company: Company;
}
