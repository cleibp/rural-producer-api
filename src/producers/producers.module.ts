import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { Producer } from './entities/producer.entity';
import { Farm } from './entities/farm.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Producer, Farm])],
    controllers: [ProducersController],
    providers: [ProducersService],
})
export class ProducersModule {}
