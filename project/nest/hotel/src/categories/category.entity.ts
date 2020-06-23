import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


export class CategoryData {
    rooms: string[];
}

@Entity()
export class Category{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column({length: 500 , nullable: true})
    description: string

    @Column()
    person: number;

    @Column({type: "jsonb", nullable: true})
    data: CategoryData;
}

