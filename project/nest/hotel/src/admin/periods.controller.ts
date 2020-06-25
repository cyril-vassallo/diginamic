import {
	Controller,
	Get,
	Put,
	ParseIntPipe,
	HttpStatus,
	HttpCode,
	Delete,
	Param,
	Body,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
	HttpException,
} from '@nestjs/common';
import { PeriodsService } from '../shared/periods/periods.service';
import { Period } from '../shared/periods/period.entity';
import { PeriodDto } from '../shared/periods/period.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('admin/periods')
@UsePipes(
	new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
	}),
)
export class PeriodsController {
	constructor(private periodsService: PeriodsService) { }

	@Get() //   /admin/periods?category=3&start=2020-06-24&end=2020-07-02
	@ApiQuery({ name: 'category', required: false })
	@ApiQuery({ name: 'start', required: false })
	@ApiQuery({ name: 'end', required: false })
	searchAll(
		@Query('category') categoryId?: number,
		@Query('start') startDate?: string,
		@Query('end') endDate?: string,
	): Promise<Period[]> {
		return this.periodsService.searchAll({ categoryId, startDate, endDate });
	}

	@Get(':id')
	readPeriod(@Param('id', ParseIntPipe) id: number): Promise<Period> {
		return this.periodsService.readOne(id);
	}

	@Post()
	createPeriod(@Body() periodDto: PeriodDto): Promise<Period> {
		if (periodDto.startDate > periodDto.endDate) {
			throw new HttpException(
				'end date must be after start date',
				HttpStatus.BAD_REQUEST,
			);
		}
		return this.periodsService.create(periodDto);
	}

	@Put(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	updatePeriod(
		@Param('id', ParseIntPipe) id: number,
		@Body() periodDto: PeriodDto,
	): Promise<void> {
		return this.periodsService.update(id, periodDto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	deletePeriod(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.periodsService.delete(id);
	}
}
