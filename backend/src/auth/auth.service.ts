import { Injectable } from '@nestjs/common';
import { AuthDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  // async signUp(body: AuthDto): Promise<Tokens> {
  //   const data = {
  //     email: body.email,
  //     password: await this.hashData(body.password),
  //   };
  //   console.log(data);
  // }
  signIn() {}
  logOut() {}
  refreshToken() {}
}
