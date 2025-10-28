import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PingService {
  constructor(private dataSource: DataSource) {}

  async checkDatabaseConnection() {
    try {
      await this.dataSource.query('SELECT 1');
      return { status: 'ok', database: 'connected' };
    } catch (error) {
      return { status: 'error', database: 'not connected', error: error.message };
    }
  }
}
