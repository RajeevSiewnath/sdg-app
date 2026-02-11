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

  /**
   * For now we assume one alignment, but of course a product could have more
   * than one alignment. We'll keep this in mind for future expansions
   * */
  get consolidatedAlignment(): Alignment | null {
    if (this.alignments.length === 0 && this.parent) {
      return this.parent?.consolidatedAlignment;
    } else if (this.alignments.length > 0) {
      return this.alignments[0];
    } else {
      return null;
    }
  }

  get consolidatedWeight() {
    let weight = this.weight;
    for (const child of this.children) {
      weight += child.consolidatedWeight;
    }
    return weight;
  }

  @OneToMany(() => Alignment, (alignment) => alignment.product)
  alignments: Alignment[];

  @ManyToOne(() => Company, (company) => company.products)
  company: Promise<Company>;
}
