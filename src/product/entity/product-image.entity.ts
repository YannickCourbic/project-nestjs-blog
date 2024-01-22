import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn()
    id:number;
    @Column("varchar")
    media:string;
    @Column("varchar" , {nullable:true})
    color:string|null;
    @Column("datetime")
    createdAt:Date;
    @ManyToOne(() => Product , product => product.media )
    product:Product;
    @Column("datetime" , {nullable:true})
    updatedAt:Date|null;
} 