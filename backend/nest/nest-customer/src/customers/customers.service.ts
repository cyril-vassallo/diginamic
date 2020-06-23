import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerDto } from './customer.dto';

@Injectable()
export class CustomersService {
    constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>){}

    getList(): Promise<Customer[]>{
        return this.customerRepository.find();
    }
    
    async getOne(id:number): Promise<Customer> {
       const customer= await this.customerRepository.findOne(id);
       if(!customer){
           throw new HttpException('Customer not found', HttpStatus.NOT_FOUND )
       }
       return customer;
    }

    create(customerDto:CustomerDto): Promise<Customer> {
        return this.customerRepository.save(customerDto);
    }

    async delete(id:number): Promise<void> {
        const result = await this.customerRepository.delete(id)
        if(result.affected === 0 ){
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }
    }

    async update(id:number, customerDto:CustomerDto): Promise<void>{
        const result = await this.customerRepository.update(id,customerDto);
        if(result.affected === 0){
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }
    }

}
