import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ProductImage } from './entity/product-image.entity';
import * as fs from "fs";
import { join } from 'path';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async createProduct(product: Product) {
    const create = this.productRepository.create(product);
    return this.productRepository.save(create);
  }

  async createProductImage(productImage: ProductImage) {
    const create = this.productImageRepository.create(productImage);
    return this.productImageRepository.save(create);
  }

  async findById(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id: id });
  }

  async findAllProducts(status:string= "public"): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.media', 'media')
      .where( {status: status})
      .getMany();
  }

  async findByIdMedia(id: number): Promise<Product> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.media', 'media')
      .where({ id: id })
      .getOne();
  }

  async findOneByProduct(data: any): Promise<Product|null> {
    return await this.productRepository.findOneBy(data);
  }


  async modifyProduct(product:Product , id:number):Promise<UpdateResult>{
    return await this.productRepository
    .createQueryBuilder()
    .update(Product)
    .set(product)
    .where( "id = :id" , {id: id})
    .execute()
    ;
  }

  async findByProductImage(id:number){
    return await this.productImageRepository.findOneBy({id: id});
  }

  async modifyProductImage(productImage:ProductImage , id:number):Promise<UpdateResult>{
    return await this.productImageRepository
      .createQueryBuilder()
      .update(ProductImage)
      .set(productImage)
      .where('id = :id', { id: id })
      .execute();
  }

  async removeProductImage(product:Product, path:string):Promise<void>{

    if(product.media.length > 0){
      product.media.forEach(async (productImage:ProductImage) => {
        //je supprime l'image correspondant
        const filename = productImage.media.replace(`${path}` , "");
        fs.unlink(join("dist", "assets" , "product" , filename) , (err) => {
          if(err){
            throw err;
          }
          console.log(`Vous avez supprimée le fichier ${filename}`);
        })
        await this.productImageRepository
          .createQueryBuilder()
          .delete()
          .from(ProductImage)
          .where('id=:id', { id: productImage.id })
          .execute();
      });
    }

    await this.productImageRepository
    .createQueryBuilder()
    .delete()
    .from(Product)
    .where("id = :id", {id: product.id})
    .execute();
  }

  async findAllByRow():Promise<number>{
    return this.productRepository.count()
  }

  async getPaginated(skip:number , take:number):Promise<Product[]>{
    return this.productRepository
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.media" , "media")
    .skip(skip)
    .take(take)
    .getMany();
  }

  async findByTitle(title:string):Promise<Product>{

    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.media', 'media')
      .where({ title: title })
      .getOne();
  }

  async searchByTitle(title:string, item:number):Promise<Product[]>{
    return this.productRepository
    .createQueryBuilder('product')
    .leftJoinAndSelect("product.media" , "media")
    .where("product.title LIKE :title" , {title: `%${title}%`})
    .take(item)
    .getMany();
  }
}



