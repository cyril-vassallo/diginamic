import { Controller, Get, Query } from '@nestjs/common';
import { Reservation } from 'src/shared/reservations/reservation.entity';
import { ReservationsService } from 'src/shared/reservations/reservations.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('admin/reservations')
export class ReservationsController {

constructor(private reservationsService: ReservationsService) { }


@Get() //   /admin/periods?category=3&start=2020-06-24&end=2020-07-02
@ApiQuery({ name: 'category', required: false })
@ApiQuery({ name: 'start', required: false })
@ApiQuery({ name: 'end', required: false })
searchAll(
    @Query('category') categoryId?: number,
    @Query('start') startDate?: string,
    @Query('end') endDate?: string,
): Promise<Reservation[]> {
    return this.reservationsService.searchAll({ categoryId, startDate, endDate });
}

}