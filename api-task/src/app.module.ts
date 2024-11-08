import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'database/database.module';

import { TaskModule } from './task/task.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
