import {Entity, PrimaryGeneratedColumn,  Column } from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id :number;

    @Column({length:255})
    firstName: string;

    @Column({length:255})
    lastName: string;
    
    @Column({length:255, nullable:true})
    email:string;
    
    toString():string {
        return `[${this.id}] - ${this.firstName} - ${this.lastName}`;
    }
}