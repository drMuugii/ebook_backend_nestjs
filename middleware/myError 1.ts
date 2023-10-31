import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Error } from 'mongoose';
import { Response, Request } from 'express';

@Catch(HttpException, Error.CastError)
export class MyErrorCatcher implements ExceptionFilter {
  catch(exception: HttpException | Error.CastError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status;
    let message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof Error.CastError) {
      status = 404;
      message = 'id бүрдэл буруу байна';
    } else {
      status = 500;
      message = 'Internal Server Error алдаа гарлаа';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });

    console.log('\x1b[31m' + message);
  }
}