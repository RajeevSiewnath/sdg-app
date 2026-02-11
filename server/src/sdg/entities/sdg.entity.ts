import { Alignment } from 'src/alignment/entities/alignment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sdg {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Alignment, (alignment) => alignment.product)
  alignments: Alignment[];
}
