import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { EResponseCodes } from 'src/common/contracts/api.enums';
import { ApiResponse } from 'src/common/contracts/api-response';
import { UserTask } from '../entities/user-task.entity';
import { UserTaskFormDto, UserTaskFilterDto } from '../contracts/task.dto';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectRepository(UserTask)
    private readonly userTaskRepository: Repository<UserTask>,
  ) {}

  async createUserTask(data: UserTaskFormDto): Promise<ApiResponse<UserTask>> {
    const newTask = this.userTaskRepository.create({
      ...data,
      userCreate: 'Default',
      dateCreate: new Date(Date.now()),
    });
    await this.userTaskRepository.save(newTask);
    return new ApiResponse(newTask, EResponseCodes.OK);
  }

  async editUserTask(
    data: UserTaskFormDto,
    id: number,
  ): Promise<ApiResponse<UserTask>> {
    const task = await this.userTaskRepository.preload({
      id,
      ...data,
      dateModify: new Date(Date.now()),
      userModify: 'Default',
    });

    if (!task)
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        'Registro no localizado',
      );

    await this.userTaskRepository.save(task);
    return new ApiResponse(task, EResponseCodes.OK);
  }

  async getUserTasksPaginated(
    filters: UserTaskFilterDto,
  ): Promise<ApiResponse<UserTask[]>> {
    const whereConditions = [];

    if (filters.description) {
      whereConditions.push({ description: Like(`%${filters.description}%`) });
    }

    const [users, total] = await this.userTaskRepository.findAndCount({
      where: whereConditions.length ? whereConditions : undefined,
      skip: (filters.page - 1) * filters.perPage,
      take: filters.perPage,
    });

    return new ApiResponse(users, EResponseCodes.OK, undefined, total);
  }

  async getUserTaskById(id: number): Promise<ApiResponse<UserTask>> {
    const user = await this.userTaskRepository.findOneBy({ id });
    if (user) {
      return new ApiResponse(user, EResponseCodes.OK);
    } else {
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        'El registro no fue encontrado.',
      );
    }
  }

  async deleteUserTask(id: number): Promise<ApiResponse<boolean>> {
    const user = await this.userTaskRepository.findOneBy({ id });
    if (user) {
      await this.userTaskRepository.remove(user);
      return new ApiResponse(true, EResponseCodes.OK);
    } else {
      return new ApiResponse(
        false,
        EResponseCodes.FAIL,
        'El registro no fue encontrado.',
      );
    }
  }
}
