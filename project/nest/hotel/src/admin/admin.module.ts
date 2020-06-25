import { Module } from '@nestjs/common';
import { CategoriesController } from 'src/admin/categories.controller';
import { PeriodsController } from './periods.controller';
import { CategoriesModule } from 'src/shared/categories/categories.module';
import { PeriodsModule } from 'src/shared/periods/periods.module';
import { ReservationsModule } from 'src/shared/reservations/reservations.module';
import { ReservationsController } from './reservations.controller';


@Module({
  controllers: [CategoriesController, PeriodsController, ReservationsController],
  imports: [CategoriesModule, PeriodsModule, ReservationsModule]
})
export class AdminModule {}
