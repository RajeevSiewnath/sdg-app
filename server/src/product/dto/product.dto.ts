import { Expose, Type } from 'class-transformer';
import { AlignmentDto } from 'src/alignment/dto/alignment.dto';
import { CompanyDto } from 'src/company/dto/company.dto';

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  weight: number;

  @Expose()
  name: string;

  @Expose()
  consolidatedWeight: number;

  @Expose()
  @Type(() => AlignmentDto)
  consolidatedAlignment: AlignmentDto;

  @Expose()
  @Type(() => ProductDto)
  children: ProductDto[];

  @Expose()
  @Type(() => AlignmentDto)
  alignments: AlignmentDto[];

  @Type(() => CompanyDto)
  company?: CompanyDto;
}
