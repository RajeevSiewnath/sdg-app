import { Expose, Type } from 'class-transformer';
import { AlignmentLevel } from '../entities/alignment.entity';
import { ProductDto } from 'src/product/dto/product.dto';
import { SdgDto } from 'src/sdg/dto/sdg.dto';

export class AlignmentDto {
  @Expose()
  @Type(() => ProductDto)
  product: ProductDto;

  @Expose()
  @Type(() => SdgDto)
  sdg: SdgDto;

  @Expose()
  alignment: AlignmentLevel;
}
