import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { IUser, User } from '../entities/user.entity';
import { CreateUserDto, UserFilterDto } from '../contracts/user.dto';
import { EResponseCodes } from 'src/common/contracts/api.enums';
import { ApiResponse } from 'src/common/contracts/api-response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<ApiResponse<User>> {
    const encryptPassword = await bcrypt.hash(
      String(userData.numberDocument),
      10,
    );

    const newUser = this.userRepository.create({
      ...userData,
      password: encryptPassword,
      userCreate: 'Default',
      dateCreate: new Date(Date.now()),
    });
    await this.userRepository.save(newUser);
    delete newUser.password;
    return new ApiResponse(newUser, EResponseCodes.OK);
  }

  async getUsersPaginated(
    filters: UserFilterDto,
  ): Promise<ApiResponse<IUser[]>> {
    const whereConditions = [];

    if (filters.email) {
      whereConditions.push({ email: Like(`%${filters.email}%`) });
    }

    if (filters.name) {
      whereConditions.push({ name: Like(`%${filters.name}%`) });
    }

    const [users, total] = await this.userRepository.findAndCount({
      where: whereConditions.length ? whereConditions : undefined,
      skip: (filters.page - 1) * filters.perPage,
      take: filters.perPage,
    });

    return new ApiResponse(users, EResponseCodes.OK, undefined, total);
  }

  async deleteUser(id: number): Promise<ApiResponse<boolean>> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      await this.userRepository.remove(user);
      return new ApiResponse(true, EResponseCodes.OK);
    } else {
      return new ApiResponse(
        false,
        EResponseCodes.FAIL,
        'El registro no fue encontrado.',
      );
    }
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    const res = await this.userRepository.find();
    return new ApiResponse(res, EResponseCodes.OK);
  }
}
