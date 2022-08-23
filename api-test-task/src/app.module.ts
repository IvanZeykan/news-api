import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './news/entities/news.entity';
import { NewsModule } from './news/news.module';

@Module({
  imports: [  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'stalker123',
    database: 'root',
    entities: [News],
    synchronize: true
  }), NewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
