import {
  Controller,
  Get,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { categories } from './news.categories';


@Controller('news')
export class NewsController {
 
  constructor(private readonly newsService: NewsService) {}

  @Get('categories')
  getCategories() {
    return categories
  }

  @Post()
  create() {
    return this.newsService.create();
  }

  @Get()
  findAll(@Query() query: any) {
    return this.newsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }
}
