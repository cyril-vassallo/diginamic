import { Column, PrimaryGeneratedColumn, JoinColumn,ManyToOne, Entity } from "typeorm";
import { Category } from "src/shared/categories/category.entity";


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

    @Column({name: 'start_date', type: 'date'})
    startDate:string;

    @Column({name: 'end_date', type: 'date'})
    endDate:string;

    @Column({type: 'json'})
    data: PeriodData;
    
}