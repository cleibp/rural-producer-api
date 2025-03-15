import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Farm } from './farm.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Producer {
    @ApiProperty({ description: 'ID do produtor' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'CPF ou CNPJ do produtor' })
    @Column({ type: 'varchar', length: 20, unique: true })
    cpfCnpj: string;

    @ApiProperty({ description: 'Nome do produtor' })
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ApiProperty({ description: 'Fazendas associadas ao produtor' })
    @OneToMany(() => Farm, (farm) => farm.producer)
    farms?: Farm[];
}