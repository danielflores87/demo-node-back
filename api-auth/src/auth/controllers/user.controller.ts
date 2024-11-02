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
  Get,
} from '@nestjs/common';
import { CreateUserDto, UserFilterDto } from '../contracts/user.dto';
import { UserService } from '../services/user.service';
import { ApiResponse } from 'src/common/contracts/api-response';
import { IUser, User } from '../entities/user.entity';
import { EResponseCodes } from 'src/common/contracts/api.enums';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<User>> {
    return await this.userService.createUser(createUserDto);
  }

  @Post('get-users-paginated')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUsersPaginated(
    @Body() filter: UserFilterDto,
  ): Promise<ApiResponse<IUser[]>> {
    return await this.userService.getUsersPaginated(filter);
  }

  @Get('get-all-users')
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<ApiResponse<IUser[]>> {
    return await this.userService.getAllUsers();
  }

  @Delete('delete-user/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string): Promise<ApiResponse<boolean>> {
    const res = await this.userService.deleteUser(Number(id));

    if (res.operation.code != EResponseCodes.OK) {
      throw new NotFoundException(res);
    }

    return res;
  }
}
