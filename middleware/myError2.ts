import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Error as MongooseError } from 'mongoose';
import { Response, Request } from 'express';

@Catch(HttpException, MongooseError.ValidationError, MongooseError.CastError)
export class MyErrorCatcher implements ExceptionFilter {
  catch(
    exception:
      | HttpException
      | MongooseError.ValidationError
      | MongooseError.CastError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status;
    let message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
      
    } else if (exception instanceof MongooseError.ValidationError) {
      status = 404;
      // Extract validation error messages from Mongoose ValidationError
      const validationErrors = [];
      for (const field in exception.errors) {
        if (exception.errors.hasOwnProperty(field)) {
          validationErrors.push(exception.errors[field].message);
        }
      }
      message = 'Validation Error, оруулсан мээлэлээ шалгана уу';
      // Include validation error messages in the response
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
        errors: validationErrors, // Include validation errors in the response
      });
    } else if (exception instanceof MongooseError.CastError) {
      status = HttpStatus.NOT_FOUND; // or HttpStatus.BAD_REQUEST based on your use case
      message = 'id бүрдэл буруу байна';
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
      });
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
    }

    console.log('\x1b[31m' + message);
  }
}
