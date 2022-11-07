import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserBackupDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserBackup } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<UserBackup>,
  ) {}
  async create(createUserDto: CreateUserBackupDto[]) {
    return await this.userRepository.save(createUserDto);
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
