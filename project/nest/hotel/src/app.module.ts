import { Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/category.entity';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [TypeOrmModule.forRoot({
  type: "postgres",
    host: "localhost",
    port: 5432,
    username: "hotel",
    password: "hotel",
    database: "hoteldb",
    entities: [Category],
    synchronize:false
  }), CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
