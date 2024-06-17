import {
  Catch,
  Logger,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    this.logger.error({
      globalExceptionFilter: exception,
      message: exception.message,
      code: exception.code,
    });

    let message = 'Server error. Please try again later.';
    if (!exception.code) {
      message = exception.message;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            message,
            statusCode,
            error: 'INTERNAL_SERVER_ERROR',
          };

    response.status(statusCode).json(errorResponse);
  }
}
