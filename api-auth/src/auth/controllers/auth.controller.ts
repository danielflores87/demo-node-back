import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../contracts/user.dto';
import { ApiResponse } from 'src/common/contracts/api-response';
import { IAuthUser } from '../contracts/user.interfaces';
import { EResponseCodes } from 'src/common/contracts/api.enums';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async userLogin(
    @Body() userLogin: UserLoginDto,
  ): Promise<ApiResponse<IAuthUser>> {
    const res = await this.authService.userLogin(userLogin);

    if (res.operation.code != EResponseCodes.OK) {
      throw new UnauthorizedException(res);
    }

    return res;
  }
}
