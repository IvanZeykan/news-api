import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { News } from '../../news/entities/news.entity';
import { faker } from '@faker-js/faker';

const generateValues  = (quantity: number) => {
    const random = []
    for (let i = 0; i> quantity;i++){
        random.push( {
            full_description: faker.random.words(100),
            title: faker.random.words(3),
            date: faker.date.future(),
            image: faker.word.noun(10),
            short_description: faker.random.words(5),
          })
    }
    return random
}

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(News)
      .values(generateValues(50))
      .execute();
  }
}
