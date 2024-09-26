import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  hashPassword = (password: string) => {
    return hashSync(password, 10);
  }

  async create(createUserDto: CreateUserDto) {
    let newUser = await this.userModel.create({
      name: createUserDto.name,
      password: this.hashPassword(createUserDto.password),
      address: createUserDto.address, age: createUserDto.age,
      email: createUserDto.email, phone: createUserDto.phone
    });
    return newUser
  }


  checkUserPassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ email: username })
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
