import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(nombre: string, email: string, password: string, role?: UserRole): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ nombre, email, password: hashedPassword, role: role || UserRole.USER });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async viewProfile(userId: number): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }
}
