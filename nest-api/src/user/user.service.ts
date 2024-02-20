import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
