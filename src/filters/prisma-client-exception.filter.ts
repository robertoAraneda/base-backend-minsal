import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    switch (exception.code) {
      case 'P2002':
        const meta = exception.meta as unknown as { target: object };
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: `Unique constraint failed on the ${meta.target}`,
          // error: exception.message,
          params: request.params,
          path: request.path,
          method: request.method,
          clientVersion: exception.clientVersion,
          errorCode: exception.code,
          timestamp: new Date().toISOString(),
        });
        break;
      case 'P2025':
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: ' Record not found.',
          // error: exception.message,
          // params: request.params,
          path: request.path,
          method: request.method,
          timestamp: new Date().toISOString(),
        });
        break;
      case 'P2003':
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: ' Record not found.',
          path: request.path,
          method: request.method,
          timestamp: new Date().toISOString(),
        });
        break;
      default:
        console.log(exception);
        super.catch(exception, host);
        break;
    }
  }
}
