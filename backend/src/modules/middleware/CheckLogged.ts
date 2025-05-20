import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';


@Injectable()
export class CheckLoggedMiddleware implements NestMiddleware{
    async use(req: any, res: any, next: (error?: Error | any) => void) {
        const token = req.headers['auth-token'];
        if(!token) {
            throw new UnauthorizedException('Token is missing')
        }

        try {
            const decodedToken = await jwt.verify(
                token,
                process.env.AUTH_TOKEN_SECRET_KEY
            );
            next();
        } catch (error) {
            return res.status(400).send({ error: 'invalid session' });
        }
    }

}