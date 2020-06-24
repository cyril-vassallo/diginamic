import { PeriodData } from "./period.entity";
import { IsNumber, IsISO8601, Allow } from "class-validator";

export class PeriodDto {

    @IsNumber()
    categoryId: number;

    @IsISO8601({strict: true})
    startDate:string;

    @IsISO8601({strict: true})
    endDate:string;
    
    @Allow()
    data: PeriodData;
}