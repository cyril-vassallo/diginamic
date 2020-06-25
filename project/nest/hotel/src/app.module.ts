import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './shared/categories/category.entity';
import { Period } from './shared/periods/period.entity';
import { Reservation } from './shared/reservations/reservation.entity';
import { AdminModule } from './admin/admin.module';
import { BookingModule } from './booking/booking.module';


@Module({
  imports: [TypeOrmModule.forRoot({
  type: "postgres",
    host: "localhost",
    port: 5432,
    username: "hotel",
    password: "hotel",
    database: "hoteldb",
    entities: [Category, Period, Reservation],
    synchronize: true
  }), AdminModule, BookingModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
