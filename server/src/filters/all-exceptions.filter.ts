import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';


type ResponseObject ={
  message:  object,
}


@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: HttpException, host: ArgumentsHost): void {

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      exception,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: (exception.getResponse() as ResponseObject).message
    }



    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}