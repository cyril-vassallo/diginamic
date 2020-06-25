import { Module } from '@nestjs/common';
import { CategoriesController } from 'src/admin/categories.controller';
import { PeriodsController } from './periods.controller';
import { CategoriesModule } from 'src/shared/categories/categories.module';
import { PeriodsModule } from 'src/shared/periods/periods.module';


@Module({
  controllers: [CategoriesController, PeriodsController],
  imports: [CategoriesModule, PeriodsModule]
})
export class AdminModule {}
