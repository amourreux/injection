import { seeder } from 'nestjs-seeder';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSeeder } from './user/user.seeder';
import { UserSchema } from './user/entities/user.entity';

dotenv.config();

seeder({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {}),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
}).run([UsersSeeder]);
