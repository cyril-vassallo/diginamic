import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categories/category.entity";


export class ReservationData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: {
        street: string;
        zipCode: string;
        city: string;
        country: string;
    }
}

@Entity()
export class Reservation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name : 'category_id'})
    categoryId: number;

    @ManyToOne(target => Category) 
    @JoinColumn({name: 'category_id'})
    category: Category

    @Column({name: 'start_name', type: 'date'})
    startDate:string;

    @Column({name: 'end_name', type: 'date'})
    endDate:string;

    @Column({type: 'json'})
    data: ReservationData;
    

}