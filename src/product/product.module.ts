import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductImage } from './entity/product-image.entity';
import { MulterModule } from '@nestjs/platform-express';
import {diskStorage} from "multer";
import { join } from 'path';
import { CategoryModule } from 'src/category/category.module';
@Module({
  imports: [
    CategoryModule,
    MulterModule.register(
        {storage: diskStorage({
        destination: join(__dirname ,'../assets/product'),
        filename: (req, file:any, callback:any) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const fileName = `${uniqueSuffix}-${file.originalname}`;          
          callback(null, fileName);
        },
      }),
      limits: {
        files: 5
      }
    }
    ),
    TypeOrmModule.forFeature([Product, ProductImage])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
