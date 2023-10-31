import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Error } from 'mongoose';

@Catch(HttpException, Error.CastError, Error.ValidationError)
export class MyErrorCatcher implements ExceptionFilter {
  catch(
    exception: HttpException | Error.CastError | Error.ValidationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;
    let errors: string[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    } else if (exception instanceof Error.CastError) {
      status = HttpStatus.NOT_FOUND;
      message = 'id бүрдэл буруу байна';
    } else if (exception instanceof Error.ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation Error';
      // Extract validation error messages from Mongoose ValidationError
      errors = Object.values(exception.errors).map((error) => error.message);
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error алдаа гарлаа';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      errors: errors,
    });

    if (message === 'Validation Error') {
      console.log('Validation Errors:', JSON.stringify(errors, null, 2));
    } else {
      console.log('\x1b[31m' + message + errors);
    }
  }
}
