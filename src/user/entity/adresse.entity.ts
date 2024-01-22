import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Adresse {
    @PrimaryGeneratedColumn()
    id:number;
    @Column("varchar" , {length: 100})
    city:string;
    @Column('int')
    postal:number;
    @Column("varchar" , {length: 200})
    adress:string;
    @Column("varchar")
    type:string;
    @ManyToOne(() => User , (user) => user.adresses, {cascade:true})
    user:User;
    @CreateDateColumn()
    createdAt:Date;
    @UpdateDateColumn()
    updatedAt:Date|null;
}