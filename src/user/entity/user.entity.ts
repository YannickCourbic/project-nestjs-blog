import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Adresse } from "./adresse.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column("varchar" , {length:100})
    firstname:string;
    @Column("varchar" , {length:100})
    lastname:string;
    @Column("int")
    year:number;
    @Column('varchar' , {length:50, unique:true})
    username:string;
    @Column("varchar" , {unique:true})
    email:string;
    @Column("json")
    roles:string[];
    @Column("text")
    password:string;
    @Column("boolean")
    locked:boolean;
    @Column("varchar")
    oldEmail:string|null;
    @OneToMany(() => Adresse , (adresse) => adresse.user )
    adresses: Adresse[] | null;
    @CreateDateColumn()
    createdAt:Date;
    @UpdateDateColumn()
    updatedAt:Date|null;
}