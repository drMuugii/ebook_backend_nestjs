import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      '\x1b[33m',
      'Result----> ' +
        `${req.method} ${req.protocol}//${req.hostname}${req.originalUrl}`,
    );

    next();
  }
}
