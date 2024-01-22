import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entity/category.entity';
// import moment from 'moment-timezone';
// import slugify from 'slugify';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ModifyCategoryDto } from './dto/modify-category.dto';
import slugify from 'slugify';


@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>){}

    async create(category:Category): Promise<Category>{
        const c = await this.categoryRepository.findOneBy({title: category.title});
        if(c) throw new BadRequestException("Le titre de la catégorie existe déjà.");
        const save = this.categoryRepository.create(category);
        return this.categoryRepository.save(save);
    }

    findAll():Promise<Category[]>{
        return this.categoryRepository
        .createQueryBuilder("category")
        .leftJoinAndSelect("category.parent" , "parent")
        .getMany();
    }

    async findById(id:number):Promise<Category>{
        const category = await this.categoryRepository.findOneBy({id: id});
        if(category) return category;
        throw new NotFoundException(`La catégorie d'id n° ${id} n'existe pas`);
    }

    async modify(id:number , newCategory:Partial<ModifyCategoryDto>):Promise<Category>{
        const category = await this.findById(id);
        category.title = newCategory.title ? newCategory.title : category.title;
        category.slug = newCategory.title ? slugify(newCategory.title) : category.slug;
        category.description = newCategory.description ? newCategory.description : category.description;
        category.visibility = newCategory.visibility ? newCategory.visibility : category.visibility;
        category.parent = newCategory.parent ? await this.findById(id) : category.parent;
        category.updatedAt = new Date();

        return this.categoryRepository.save(category);
    
    } 

    async modifyLogo(category:Category):Promise<Category>{
        
        return this.categoryRepository.save(category);
    }

    async delete(id:number):Promise<DeleteResult>{
        await this.findById(id);
        return this.categoryRepository.createQueryBuilder().delete().from(Category).where("id = :id", {id:id}).execute();
    }

    async findOneBy(data:any):Promise<Category> {
        return this.categoryRepository.findOneBy(data);
    }
}
