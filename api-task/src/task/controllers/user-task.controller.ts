import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  NotFoundException,
  Delete,
  UseGuards,
  Put,
  Get,
} from '@nestjs/common';
import { ApiResponse } from 'src/common/contracts/api-response';
import { EResponseCodes } from 'src/common/contracts/api.enums';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserTaskService } from '../services/user-task.service';
import { UserTaskFormDto, UserTaskFilterDto } from '../contracts/task.dto';
import { UserTask } from '../entities/user-task.entity';

@Controller('api/user-task')
export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) {}

  @Post('create-user-task')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUserTask(
    @Body() data: UserTaskFormDto,
  ): Promise<ApiResponse<UserTask>> {
    return await this.userTaskService.createUserTask(data);
  }

  @Post('get-user-tasks-paginated')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUserTasksPaginated(
    @Body() filter: UserTaskFilterDto,
  ): Promise<ApiResponse<UserTask[]>> {
    return await this.userTaskService.getUserTasksPaginated(filter);
  }

  @Put('update-user-task/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserTaskFormDto,
  ): Promise<ApiResponse<UserTask>> {
    return this.userTaskService.editUserTask(data, Number(id));
  }

  @Delete('delete-user-task/:id')
  @UseGuards(AuthGuard)
  async deleteUserTask(@Param('id') id: string): Promise<ApiResponse<boolean>> {
    const res = await this.userTaskService.deleteUserTask(Number(id));

    if (res.operation.code != EResponseCodes.OK) {
      throw new NotFoundException(res);
    }

    return res;
  }

  @Get('get-user-task-by-id/:id')
  @UseGuards(AuthGuard)
  async getUserTaskById(
    @Param('id') id: string,
  ): Promise<ApiResponse<UserTask>> {
    const res = await this.userTaskService.getUserTaskById(Number(id));

    if (res.operation.code != EResponseCodes.OK) {
      throw new NotFoundException(res);
    }

    return res;
  }
}
