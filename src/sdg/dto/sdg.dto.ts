import { Expose, Type } from 'class-transformer';
import { AlignmentDto } from 'src/alignment/dto/alignment.dto';

export class SdgDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => AlignmentDto)
  alignments: AlignmentDto[];
}
