import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository, InsertResult } from 'typeorm';
import { CategoryDto } from './category.dto';


@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>){
    }

    async readAll():Promise<Category[]> {
        const categories = await this.categoriesRepository.find();
        return categories;
    }

    async readOne(id: number): Promise<Category> {
        const category: Category = await this.categoriesRepository.findOne(id);
        if(!category) {
            throw new HttpException("Category not found", HttpStatus.NOT_FOUND)
        }
        return category;
    }

    async create(categoryDto: CategoryDto): Promise<Category> {
        await this.checkNoDuplicated(categoryDto.rooms)
        const insertResult: InsertResult =  await this.categoriesRepository.insert(categoryDto);
        console.log(insertResult.identifiers);
        const insertId = insertResult.identifiers[0].id;
        return this.categoriesRepository.findOne(insertId);
    }

    async update(id: number, categoryDto: CategoryDto): Promise<void>{
        await this.checkNoDuplicated(categoryDto.rooms, id)
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

    async checkNoDuplicated(newRooms: string[], ignoreId?: number): Promise<void> {
        const existingCategories: Category[] = await this.categoriesRepository.find();
        const otherCategories = existingCategories.filter(cat => cat.id !== ignoreId);
        // ex: allRooms = ['101','102','201','102'];
        const allRooms: string[] = [ newRooms, ...otherCategories.map(cat => cat.rooms)].flat();
        //ex : occurrences = [1,2,1,2];
        const occurrence: number[] = allRooms.map(room => allRooms.filter(r => r === room ).length)
        const hasDuplicated: boolean = occurrence.some(occ => occ > 1)
        if(hasDuplicated){
            throw new HttpException('Roms already has been assigned to a category', HttpStatus.BAD_REQUEST);
        }
    }

}
