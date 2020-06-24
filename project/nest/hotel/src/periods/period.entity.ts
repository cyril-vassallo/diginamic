import { Column, PrimaryGeneratedColumn, JoinColumn,ManyToOne, Entity } from "typeorm";
import { Category } from "src/categories/category.entity";


export class PeriodData {
    prices:number[]; // du dimanche au samedi
}

@Entity()
export class Period {

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
    data: PeriodData;
    
}