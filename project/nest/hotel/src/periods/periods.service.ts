import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Period } from './period.entity';
import { Repository, InsertResult } from 'typeorm';
import { PeriodDto } from './period.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PeriodsService {
    constructor(@InjectRepository(Period) private periodsRepository: Repository<Period>) {
    }

    async searchAll(options?: { startDate?: string, endDate?: string, categoryId: number, ignorePeriodId?: number }): Promise<Period[]> {
        let query = this.periodsRepository.createQueryBuilder('period');
        if (options?.startDate) {
            query = query.andWhere('period.endDate >= :startDate', { startDate: options.startDate })
        }
        if (options?.endDate) {
            query = query.andWhere('period.startDate <= :endDate', { endDate: options.endDate })
        }
        if (options?.categoryId) {
            query = query.andWhere('period.categoryId = :catId', { catId: options.categoryId });
        }
        const allPeriods: Period[] = await query.getMany();// return allPeriods.filter(period => !options?.ignorePeriodId || period.id !== options.ignorePeriodId);
        console.log(query.getSql(), allPeriods);
        const mustIgnoredId = options?.ignorePeriodId;
        return mustIgnoredId
            ? allPeriods.filter(period => period.id !== options.ignorePeriodId)
            : allPeriods;
    }

    async readOne(id: number): Promise<Period> {
        const Period: Period = await this.periodsRepository.findOne(id);
        if (!Period) {
            throw new HttpException("Period not found", HttpStatus.NOT_FOUND)
        }
        return Period;
    }

    async create(periodDto: PeriodDto): Promise<Period> {
        const existingPeriod: Period[] = await this.searchAll(
            {
                startDate: periodDto.startDate,
                endDate: periodDto.endDate,
                categoryId: periodDto.categoryId
            }
        );
        if (existingPeriod.length > 0) {
            throw new HttpException('Periods must not overlap', HttpStatus.CONFLICT);
        }
        const insertResult: InsertResult = await this.periodsRepository.insert(periodDto);
        console.log(insertResult.identifiers);
        const insertId = insertResult.identifiers[0].id;
        return this.periodsRepository.findOne(insertId);
    }

    async update(id: number, periodDto: PeriodDto): Promise<void> {
        const existingPeriod: Period[] = await this.searchAll(
            {
                startDate: periodDto.startDate,
                endDate: periodDto.endDate,
                categoryId: periodDto.categoryId,
                ignorePeriodId: id
            }
        );
        if (existingPeriod.length > 0) {
            throw new HttpException('Periods must not overlap', HttpStatus.CONFLICT);
        }
        const result = await this.periodsRepository.update(id, periodDto)
        if (result.affected === 0) {
            throw new HttpException("Period not found", HttpStatus.NOT_FOUND)
        }
    }

    async delete(id: number): Promise<void> {
        const result = await this.periodsRepository.delete(id);
        if (result.affected === 0) {
            throw new HttpException('Period not found', HttpStatus.NOT_FOUND);
        }
    }

}
