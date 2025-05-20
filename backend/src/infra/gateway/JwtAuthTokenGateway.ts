import {
  AuthTokenGateway,
  Payload,
} from 'src/core/domain/gateways/AuthTokenGateway';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

export class JwtAuthTokenGateway implements AuthTokenGateway {
  async signIn(payload: Payload): Promise<string> {
    return await jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET_KEY,
        {
            expiresIn: '3h',
        }
    );
  }
  async verify(token: string): Promise<Payload> {
    try {
      const payload: any = await jwt.verify(token, process.env.AUTH_TOKEN_SECRET_KEY);
      return {
        login: payload.login,
        password: payload.password,
      };
    } catch (error) {
      throw new UnauthorizedException(`Invalid Token:${error}`);
    }
  }
}
