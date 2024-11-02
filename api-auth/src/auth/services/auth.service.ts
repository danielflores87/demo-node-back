import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserLoginDto } from '../contracts/user.dto';
import { ApiResponse } from 'src/common/contracts/api-response';
import { IAuthUser } from '../contracts/user.interfaces';
import { EResponseCodes } from 'src/common/contracts/api.enums';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async userLogin(login: UserLoginDto): Promise<ApiResponse<IAuthUser>> {
    const user = await this.userRepository.findOneBy({ email: login.email });

    if (!user)
      return new ApiResponse(
        null,
        EResponseCodes.WARN,
        'El correo indicado no se encuentra registrado.',
      );

    const validPassword = await bcrypt.compare(login.password, user.password);

    if (!validPassword)
      return new ApiResponse(null, EResponseCodes.WARN, 'Contraseña no valida');

    const token = await this.jwtService.signAsync({
      userId: user.id,
      numberDocument: user.numberDocument,
    });
    delete user.password;
    return new ApiResponse({ user, token }, EResponseCodes.OK);
  }
}
