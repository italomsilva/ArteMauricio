import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class CheckApiKeyMiddleware implements NestMiddleware{
    private readonly expectedApiKey = process.env.APIKEY_VALUE;
    async use(req: Request, res: Response, next: NextFunction) {
       const apikey = req.headers['api-key-value'];
       if (!apikey || apikey !== this.expectedApiKey) {
        throw new UnauthorizedException('Unauthorized Apikey');
      }
      next();
    }

}