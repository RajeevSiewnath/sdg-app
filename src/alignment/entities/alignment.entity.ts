import { Product } from 'src/product/entities/product.entity';
import { Sdg } from 'src/sdg/entities/sdg.entity';
import { Entity, PrimaryColumn, ManyToOne, Column } from 'typeorm';

export enum AlignmentLevel {
  StronglyAligned = 'strongly aligned',
  Aligned = 'aligned',
  Misaligned = 'misaligned',
  StronglyMisaligned = 'strongly misaligned',
}

@Entity()
export class Alignment {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  sdgId: number;

  @ManyToOne(() => Product, (product) => product.alignments)
  product: Product;

  @ManyToOne(() => Sdg, (sdg) => sdg.alignments)
  sdg: Sdg;

  @Column({
    // This should be the proper way in a proper dev env:
    // type: 'enum',
    // enum: AlignmentLevel,
    type: 'text',
    default: null,
    nullable: true,
  })
  alignment: AlignmentLevel;
}
