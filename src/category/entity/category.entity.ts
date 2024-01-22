import { Product } from "src/product/entity/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number;
    @Column("varchar" , {length: 100 , unique:true})
    title:string;
    @Column("varchar")
    slug:string;
    @Column("text", {nullable:true})
    description:string|null;
    @Column("varchar" , {nullable:true})
    logo:string|null;
    @Column("boolean")
    visibility:boolean;
    @ManyToOne(() => Category , (category) => category.id)
    parent:Category|null;
    @OneToMany(() => Product , product => product.category)
    products:Product[];
    @Column("datetime")
    createdAt:Date;
    @Column("datetime" , {nullable:true})
    updatedAt:Date|null;
}