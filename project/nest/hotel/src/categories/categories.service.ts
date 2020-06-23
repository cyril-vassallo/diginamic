import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository, InsertResult } from 'typeorm';
import { CategoryDto } from './category.dto';


@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>){
    }

    async readAll():Promise<Category[]>{
        const categories = await this.categoriesRepository.find();
        return categories;
    }

    async readOne(id: number): Promise<Category>{
        const category: Category = await this.categoriesRepository.findOne(id);
        if(!category) {
            throw new HttpException("Category not found", HttpStatus.NOT_FOUND)
        }
        return category;
    }

    async create(categoryDto: CategoryDto): Promise<Category> {
        const insertResult: InsertResult =  await this.categoriesRepository.insert(categoryDto);
        console.log(insertResult.identifiers);
        const insertId = insertResult.identifiers[0].id;
        return this.categoriesRepository.findOne(insertId);
    }

    async update(id: number, categoryDto: CategoryDto): Promise<void>{
        const result = await this.categoriesRepository.update(id,categoryDto)
        if(result.affected === 0 ){
            throw new HttpException("Category not found", HttpStatus.NOT_FOUND)
        }
    }

    async delete(id: number): Promise<void>{
        const result  = await this.categoriesRepository.delete(id);
        if(result.affected === 0) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
    }
}
