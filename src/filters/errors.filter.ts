import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { UniqueViolationError } from 'objection';

//  https://stackoverflow.com/questions/66777587/how-to-handling-error-on-objectionjs-with-nestjs-exception-filters
@Catch()
export class ErrorsFilter extends BaseExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof UniqueViolationError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `${exception.columns.join()} already exist in database`,
        error: exception.name,
      });
    }

    super.catch(exception, host);
  }
}
