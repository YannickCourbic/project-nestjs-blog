import { Category } from "src/category/entity/category.entity";
import { ProductImage } from "./product-image.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsArray, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @IsString()
    @IsNotEmpty()
    @Column('varchar', { length: 150, unique: true })
    title: string;
    @IsString()
    @IsNotEmpty()
    @Column('varchar')
    slug: string;
    @IsString()
    @IsNotEmpty()
    @Column('varchar')
    reference:string;
    @IsArray()
    @Column('varchar')
    status: string;
    @IsInt()
    @Min(0)
    @Column('int')
    stock: number;
    @IsInt()
    @Min(0)
    @Column('float')
    price: number;
    @ManyToOne(() => Category, (category) => category.products , {cascade:true})
    category: Category | null;
    @OneToMany(() => ProductImage, (productImage) => productImage.product , {cascade:true})
    media: ProductImage[] | null;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn({nullable:true})
    updatedAt: Date | null;
}