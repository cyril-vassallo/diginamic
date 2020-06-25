import { CategoryData } from './category.entity';
import {
  MaxLength,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, {
    message:
      'Votre nom de catégorie est trop long, 50 caractères maximum sont requis',
  })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  person: number;

  @IsOptional()
  data: CategoryData;

  get rooms(): string[] {
    return this.data?.rooms || [];
  }
}

