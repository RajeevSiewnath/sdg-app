import { Expose, Type } from 'class-transformer';
import { ProductDto } from 'src/product/dto/product.dto';

export class CompanyDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => ProductDto)
  products: ProductDto;
}
