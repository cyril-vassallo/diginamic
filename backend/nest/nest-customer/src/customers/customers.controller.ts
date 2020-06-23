import { Controller, Get, Put, Post ,Delete, Body, Param, ParseIntPipe, HttpStatus, HttpCode, ValidationPipe, UsePipes } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';
import { CustomerDto } from './customer.dto';

@Controller('customers')
@UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}))
export class CustomersController {
    constructor(private customerDb : CustomersService){
    }

    @Get()
    getList(): Promise<Customer[]>{
        return this.customerDb.getList();
    }

    @Get(':id')
    getOne(@Param('id',ParseIntPipe) id:number) {
        return this.customerDb.getOne(id);
    }

    @Put(':id')
    updateOne(
            @Param('id', ParseIntPipe) id: number, 
            @Body() customerDto: CustomerDto) {
        return this.customerDb.update(id, customerDto );
    }

    @Post()
    createOne(@Body(new ValidationPipe()) customerDto: CustomerDto) {
        return this.customerDb.create(customerDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteOne(@Param('id', ParseIntPipe) id: number):Promise<void> {
        return this.customerDb.delete(id);
    }
}
