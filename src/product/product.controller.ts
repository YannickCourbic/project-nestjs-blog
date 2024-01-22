import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import {  FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { config as dotenvConfig } from 'dotenv';
import { Product } from './entity/product.entity';
import { ParseBodyArrayProductImage, ParseBodyData } from 'src/decorator/parse-data.decorator';
import slugify from 'slugify';
import { CategoryService } from 'src/category/category.service';
import { AddProductDto } from './dto/add-product.dto';
import { ProductImage } from './entity/product-image.entity';
import { ExpressMulterFile } from 'src/type/file.type';
import { ModifyProductDto } from './dto/modify-product.dto';
import { ModifyProductImageDto } from './dto/modify-product-image.dto';
import { join } from 'path';
import * as fs from 'fs';
import { GetPaginatedProductDto } from './dto/getpaginated.dto';

dotenvConfig({ path: '.env' });

@Controller(`/apirest/${process.env.DATABASE_NAME}/product`)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post('/create')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() product: AddProductDto,
  ) {
    /**
     * ! D'abord j'instancie le produit
     */

    console.log(product);
    const newProduct = new Product();
    const title = await this.productService.findOneByProduct({
      title: product.title,
    });
    if (title)
      throw new NotFoundException(
        `Le titre ${product.title} du produit est déjà pris.`,
      );
    newProduct.title = product.title;
    newProduct.slug = slugify(product.title);
    newProduct.reference = `${Date.now()}-${Math.round(Math.random() * 1e9)}-product`;
    newProduct.status = product.status;
    newProduct.stock = product.stock;
    newProduct.price = product.price;
    newProduct.category = await this.categoryService.findById(product.category);

    /**
     * ! Par la suite , je vais instancier productImage
     */

    const saveProduct = await this.productService.createProduct(newProduct);
    return res.status(201).json({
      message: 'Vous avez crée un produit avec succès.',
      product: saveProduct,
    });
  }

  @Post('/upload-product/:id')
  @UseInterceptors(FilesInterceptor('products-image'))
  async uploadImageProduct(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @ParseBodyArrayProductImage() productImageArray: ProductImage[],
    @UploadedFiles() files: Array<ExpressMulterFile>,
  ) {
    const product = await this.productService.findById(id);

    /**
     * ! upload des images de produits
     */
    const productImageArr: ProductImage[] = [];
    productImageArray.forEach(
      async (productImage: ProductImage, index: number) => {
        const file = files[index];
        console.log(file);
        if (file) {
          productImage.media = `${req.protocol}://${req.get('host')}/apirest/${process.env.DATABASE_NAME}/assets/product/${file.filename}`;
          productImage.createdAt = new Date();
          productImage.product = product;
          productImageArr.push(productImage);
          await this.productService.createProductImage(productImage);
        }
      },
    );

    res.status(201).json({
      message: `Vous avez upload les images correspondant au produit ${product.title}`,
      medias: productImageArr,
    });
  }

  @Get('/all')
  async getProducts(@Res() res: Response) {
    const products = await this.productService.findAllProducts();
    return res.status(200).json({
      message: 'Vous avez récupérée toutes les produits',
      products: products,
    });
  }

  @Get('/:id')
  async getProductById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const product = await this.productService.findByIdMedia(id);
    return res.status(200).json({
      message: `Vous avez récupéreé le produit ${product.title}`,
      product: product,
    });
  }

  @Put('/modify/:id')
  async updateProduct(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() product: ModifyProductDto,
  ) {
    console.log(product, id);
    const p = await this.productService.findById(id);
    if (!p)
      throw new NotFoundException("L'identifiant du produit n'existe pas.");
    if (product) {
      if (product.category) {
        const c = await this.categoryService.findById(product.category);
        if (!c)
          throw new NotFoundException(
            "L'identifiant de la catégorie n'existe pas.",
          );
      }
      if (product.title) {
        const t = await this.productService.findOneByProduct({
          title: product.title,
        });
        if (t) throw new BadRequestException('Le titre du produit existe déjà');
      }
    }

    const productUpdate = new Product();
    productUpdate.title = product.title !== undefined ? product.title : p.title;
    productUpdate.stock = product.stock !== undefined ? product.stock : p.stock;
    productUpdate.price = product.price !== undefined ? product.price : p.price;
    productUpdate.status =
      product.status !== undefined ? product.status : p.status;
    productUpdate.category =
      product.category !== undefined
        ? await this.categoryService.findById(product.category)
        : p.category;
    productUpdate.slug =
      product.title !== undefined ? slugify(product.title) : p.title;
    productUpdate.updatedAt = new Date();

    const modifyProduct = await this.productService.modifyProduct(
      productUpdate,
      id,
    );

    return res.status(200).json({
      message: 'Vous avez modifiée votre produit avec succès.',
      product: modifyProduct,
    });
  }

  @Put('modify-upload-product/:id')
  @UseInterceptors(FileInterceptor('products-modify-image'))
  async modifyUploadProduct(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id', ParseIntPipe)
    id: number,
    @ParseBodyData() productImage: ModifyProductImageDto,
    @UploadedFile() file: any,
  ) {
    const productImageExists = await this.productService.findByProductImage(id);

    if (!productImageExists)
      throw new NotFoundException(
        "L'image rattaché à un produit n'existe pas.",
      );

    if (productImageExists.media) {
      const filename = productImageExists.media.replace(
        `${req.protocol}://${req.get('host')}/apirest/${process.env.DATABASE_NAME}/assets/product/`,
        '',
      );

      const filePath = join(
          'dist', 
          'assets', 
          'product', 
          filename
        );
      fs.unlink(filePath , (err) => {
        if(err){
          throw err;
        }

        console.log(`Image ${filename} supprimée.`);
      });
      
      
    }
    productImageExists.media = `${req.protocol}://${req.get('host')}/apirest/${process.env.DATABASE_NAME}/assets/product/${file.filename}`;
    productImageExists.updatedAt = new Date();
    console.log(productImage.color);
    productImageExists.color = productImage.color;
    this.productService.modifyProductImage(productImageExists , id);
    return res.status(200).json({
      message: "Vous avez modifié avec succès l'image associè à votre produit.",
    });
  }


  @Delete("remove/:id")
  async deletedProductAndImage(
    @Res() res:Response,
    @Req() req:Request,
    @Param("id" , ParseIntPipe) id:number,
  ){
    const product = await this.productService.findByIdMedia(id);
    console.log(product);
    if(!product) throw new NotFoundException("Le produit que vous souhaitez supprimer n'existe pas.");

    await this.productService.removeProductImage(product, `${req.protocol}://${req.get('host')}/apirest/${process.env.DATABASE_NAME}/assets/product/`)
    
    return res.status(200).json({message: `Vous avez supprimer le produit n° ${id}`})
  }


  @Get("/query/q")
  async queryProduct(
    @Res() res:Response,
    @Query() queries:GetPaginatedProductDto
  ){
    console.log(queries);
    let ressource;
    if(queries.id !== undefined && queries.all === undefined){
      ressource = await this.productService.findByIdMedia(queries.id);
      if(!ressource) throw new NotFoundException("L'identifiant de la ressource demandée n'existe pas.")
    }
    else if(queries.all !== undefined){
      if(queries.page && queries.item){
            const total = await this.productService.findAllByRow();
            if(queries.item === 0 )  throw new NotFoundException("Error: 'item' should not be zero for pagination.");
            const totalPages = Math.ceil(total/queries.item);
            if(queries.page > totalPages) throw new BadRequestException('Page current > total page')
            const currentPage = Math.min(queries.page, totalPages);
            const skip = (currentPage - 1) * queries.item;
            const pagination = await this.productService.getPaginated(skip , queries.item);
            ressource = pagination;
            
      }


      else{
        ressource = await this.productService.findAllProducts();

      }
    }
    else if(queries.name 
            && queries.id === undefined 
            && queries.all === undefined 
            && queries.item === undefined 
            && queries.page === undefined 
            && queries.status === undefined){

        ressource = await this.productService.findByTitle(queries.name);
    }
    else if (
      queries.search &&
      queries.name === undefined &&
      queries.id === undefined &&
      queries.all === undefined &&
      queries.item !== undefined &&
      queries.page === undefined &&
      queries.status === undefined
    ){
      ressource = await this.productService.searchByTitle(queries.search , queries.item);
    }
      return res
        .status(200)
        .json({
          message: 'Vous avez récupérée avec succès la ressource demandée.',
          ressource: ressource,
        });
  }


  

}

