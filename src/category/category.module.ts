import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { MulterModule } from '@nestjs/platform-express';
import {diskStorage} from "multer";
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname ,'../assets/category'),
        filename: (req, file:any, callback:any) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const fileName = `${uniqueSuffix}-${file.originalname}`;          
          callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports:[CategoryService]
})
export class CategoryModule {}


