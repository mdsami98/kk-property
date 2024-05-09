import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/craete-update-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Post('/signup')
  // signUp(@Body() body: AuthDto): Promise<Tokens> {
  //   return this.authService.signUp(body);
  // }

  // @Post('/signin')
  // signIn(@Body() body: CreateUserDto) {
  //   // return this.authService.signIn(body.email, body.password);
  // }

  // @Post('/logout')
  // logOut(@Body() body: CreateUserDto) {
  //   // return this.authService.logOut(body.email, body.password);
  // }

  // @Post('/refresh')
  // refreshToken(@Body() body: CreateUserDto) {
  //   // return this.authService.refreshToken(body.email, body.password);
  // }
}
