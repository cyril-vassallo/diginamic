import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/category.entity';
import { CategoriesModule } from './categories/categories.module';
import { PeriodsModule } from './periods/periods.module';
import { Period } from './periods/period.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
  type: "postgres",
    host: "localhost",
    port: 5432,
    username: "hotel",
    password: "hotel",
    database: "hoteldb",
    entities: [Category, Period],
    synchronize:true
  }), CategoriesModule, PeriodsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
