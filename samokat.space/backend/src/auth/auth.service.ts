import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Public } from './decorators/public.decorator';
import { SuccessfullSignInDto } from './dto/successfull-sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  async signIn(email: string, pass: string) {
    const user = await this.usersService.findByLogin(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.login, id: user.id };
    const userData = new SuccessfullSignInDto(
      user.name,
      user.login,
      user.jobTitle,
      user.imgUrl,
    );

    return {
      ...userData,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
