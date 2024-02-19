import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async seed(): Promise<any> {
    // Generate 100 users.
    const saltOrRounds = 10;
    const password = '123456';
    const hash = await bcrypt.hash(password, saltOrRounds);

    const users = DataFactory.createForClass(User).generate(10, {
      password: hash,
    });

    this.user.insertMany([
      { email: 'joe@email.com', password: hash, accessHash: '' },
    ]);

    // Insert into the database.
    return this.user.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.user.collection.drop();
  }
}
