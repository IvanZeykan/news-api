import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { Max, Min } from "class-validator"
import { categories } from "../news.categories"

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'enum', enum: categories})
    category: string

    @Column({type: 'varchar'})
    image: string
    
    @Column({type: 'varchar'})
    title: string
    
    @Column({type: 'date'})
    date: Date
    
    @Column({type: 'varchar'})
    short_description: string
    
    @Column({type: 'text'})
    @Min(200)
    full_description: string
    
    @Column({type: 'int', default: 0 })
    @Max(2000000)
    likes_quantity: number
}