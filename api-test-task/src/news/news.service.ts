import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { faker } from '@faker-js/faker';
import { categories } from './news.categories';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create() {
    const all = await this.newsRepository.find();
    if (all.length) await this.newsRepository.delete(all.map((x) => x.id));
    const generateValues = (quantity: number) => {
      const random = [];
      for (let i = 0; i < quantity; i++) {
        random.push({
          full_description: faker.random.words(70),
          title: faker.random.words(3),
          date: faker.date.future(),
          image: faker.word.noun(10),
          short_description: faker.random.words(5),
          category: categories[Math.floor(Math.random() * categories.length)],
        });
      }
      return random;
    };
    return await this.newsRepository.insert(generateValues(20));
  }

  async findAll(query) {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const category = query.category || '';

    const where: { category?: string } = {};
    if (category) where.category = category;

    const result = await this.newsRepository.find({
      select: ['id', 'title', 'date', 'image', 'category', 'short_description'],
      where,
      take: take,
      skip: skip,
    });

    return {
      result,
    };
  }

  async findOne(id: number) {
    const result = await this.newsRepository.findOne({
      select: ['id', 'title', 'date', 'image', 'category', 'full_description'],
      where: { id },
    });

    return {
      result,
    };
  }
}
