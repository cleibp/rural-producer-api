import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { ProducersModule } from './producers/producers.module';
import { CropsModule } from './crops/crops.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot(databaseConfig), ProducersModule, CropsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
