import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const loggerObject = {
            route: req.originalUrl,
            method: req.method,
            body: req.body,
            fromIp: req.ip,
            date: new Date(),
        }
        console.log(loggerObject)

        next();
    }
}