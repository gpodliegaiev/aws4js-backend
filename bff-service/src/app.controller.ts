import {
  Controller,
  All,
  Req,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AxiosError } from 'axios';

@Controller('*')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All()
  async handleRequest(@Req() request: Request) {
    try {
      const responseData = await this.appService.makeRequest(request);

      return responseData;
    } catch (error) {
      let response;
      let status;

      if (error instanceof AxiosError) {
        response = response?.data;
        status = response?.status;
      }
      if (error instanceof HttpException) {
        response = error.getResponse();
        status = error.getStatus();
      }
      throw new HttpException(
        response || error.message,
        status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
