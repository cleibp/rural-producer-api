import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Producer } from '../producers/entities/producer.entity';
import { Farm } from '../producers/entities/farm.entity';
import { Crop } from '../crops/entities/crop.entity';
import { config } from 'dotenv';

config();

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Producer, Farm, Crop],
    synchronize: true,
    autoLoadEntities: true,
    logging: process.env.NODE_ENV === 'development',
    ssl: {
        rejectUnauthorized: false,
    },
};