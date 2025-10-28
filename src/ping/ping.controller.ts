import { Controller, Get } from '@nestjs/common';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Get()
  async ping() {
    const dbStatus = await this.pingService.checkDatabaseConnection();
    return {
      message: 'NestJS server is running!',
      ...dbStatus,
    };
  }
}
