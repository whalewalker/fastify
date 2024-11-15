import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../types';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: string[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;
      message = exceptionResponse.message || exception.message;
      errors = Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message
        : [exceptionResponse.message];
    } else if (exception instanceof TypeError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Type error occurred';
      errors = [exception.message];
    } else if (exception instanceof SyntaxError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Syntax error occurred';
      errors = [exception.message];
    }

    response
      .status(status)
      .json(new ApiResponse(status.toString(), message, null, errors));
  }
}
