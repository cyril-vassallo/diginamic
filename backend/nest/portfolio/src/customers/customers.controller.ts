import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from 'src/app.service';


@Controller('customers')
export class CustomersController {
  constructor(private readonly appService: AppService){}
  @Get("list")
  @HttpCode(200)
  getCustomers() : Array<string>{
      let color:string = " blue";
      return this.appService.getCustomers().map(customer => customer+color);
    }
}
