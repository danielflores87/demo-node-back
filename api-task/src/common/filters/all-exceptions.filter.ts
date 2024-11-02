import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../contracts/api-response';
import { EResponseCodes } from '../contracts/api.enums';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    console.error(exception);

    response
      .status(status)
      .json(
        message instanceof ApiResponse
          ? message
          : new ApiResponse(
              null,
              EResponseCodes.FAIL,
              `Error no controlado en: ${request.url} : ${typeof message === 'object' && message !== null && 'error' in message ? message.error : String(message)}`,
            ),
      );
  }
}
