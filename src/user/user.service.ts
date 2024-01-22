import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Adresse } from './entity/adresse.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    @InjectRepository(Adresse)
    private readonly addressRespository:Repository<Adresse>
  ) {}


  async createUser(){
    
  }
}
