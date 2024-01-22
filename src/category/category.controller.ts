import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Request, Response } from 'express';
import { Category } from './entity/category.entity';
import { AddCategoryDto } from './dto/add-category.dto';
import slugify from 'slugify';
import { GetPaginatedCategoryDto } from './dto/getpaginated.dto';
import {config as dotenvConfig} from "dotenv";
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ParseBodyData } from 'src/decorator/parse-data.decorator';
import { ModifyCategoryDto } from './dto/modify-category.dto';
import * as fs from "fs";
import { join } from 'path';
dotenvConfig({ path: '.env' });

@Controller(`/apirest/${process.env.DATABASE_NAME}/category`)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('category-image'))
  async create(
    @Req() req: Request,
    @Res() res: Response,
    // @Body('data') newCategory: AddCategoryDto,
    @ParseBodyData() newCategory:AddCategoryDto,
    @UploadedFile()
    file:any,
  ) {

    const category = new Category();
    const { title, description, parent } = newCategory;
    category.title = title;
    category.description = description !== undefined ? description : null;
    category.parent =
      parent !== undefined ? await this.categoryService.findById(parent) : null;
    category.createdAt = new Date();
    category.slug = slugify(title);
    category.visibility = true;
    category.logo = null;

    if (file) {
      // ${req.protocol}://${req.get("host")}/logo/${req.file.filename}
      category.logo = `${req.protocol}://${req.get('host')}/apirest/${process.env.DATABASE_NAME}/assets/category/${file.filename}`;
    }

    const save = await this.categoryService.create(category);
    return res.status(201).json({
      message: 'Vous avez créer une catégorie avec succès.',
      category: save,
    });
  }

  @Get('/all')
  async all(@Res() res: Response, @Query() query: GetPaginatedCategoryDto) {
    console.log(query);

    return res.status(200).json({
      message: 'Vous avez récupérer toute les catégorie.',
      categories: await this.categoryService.findAll(),
    });
  }

  @Get('/:id')
  async byId(
    @Res() res: Response,
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id: number,
  ) {
    return res.status(200).json({
      message: 'Vous avez récupérer une catégorie',
      category: (await this.categoryService.findById(id)) || {},
    });
  }

  @Put('/update/:id')
  async modify(
    @Res() res: Response,
    @Body() category: Partial<ModifyCategoryDto>,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(category, id);
    return res.status(200).json({
      message: ' Vous avez modifiée la catégorie avec succès.',
      category: await this.categoryService.modify(id, category),
    });
  }

  @Patch('/modify-logo/:id')
  @UseInterceptors(FileInterceptor('category-image'))
  async modifyLogo(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file,
  ) {
    const category = await this.categoryService.findById(id);

    if (file) {
      if (category.logo !== null) {
        const filePath = join(
          'dist',
          'assets',
          'category',
          category.logo.replace(
            `${req.protocol}://${req.get('host')}/apirest/${process.env.DATABASE_NAME}/assets/category/`,
            '',
          ),
        );
        fs.unlink(filePath, (err) => {
          if (err) {
            throw err;
          }
          console.log(`Image ${file.filename} supprimée.`);
        });
      }

      category.logo = `${req.protocol}://${req.get('host')}/apirest/${process.env.DATABASE_NAME}/assets/category/${file.filename}`;
      category.updatedAt = new Date();
    }
    await this.categoryService.modifyLogo(category);
    return res
      .status(200)
      .json({
        message: 'Vous avez supprimée le logo de la catégorie',
        category: category,
      });
  }

  @Delete('/delete/:id')
  async deleted(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    return res
      .status(200)
      .json({
        message: `Vous avez supprimée avec succès la catégorie n° ${id}`,
        category: await this.categoryService.delete(id),
      });
  }
}
