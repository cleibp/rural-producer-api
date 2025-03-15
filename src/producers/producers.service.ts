import { Injectable, BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { Farm } from './entities/farm.entity';
import { CreateProducerDto } from './dtos/create-producer.dto';
import { CreateFarmDto } from './dtos/create-farm.dto';
import { validateCpfCnpj } from '../utils/cpf-cnpj-validator';
import { UpdateProducerDto } from './dtos/update-producer.dto';

@Injectable()
export class ProducersService {
    private readonly logger = new Logger(ProducersService.name);

    constructor(
        @InjectRepository(Producer)
        private producerRepository: Repository<Producer>,
        @InjectRepository(Farm)
        private farmRepository: Repository<Farm>,
    ) {}

    async createProducer(createProducerDto: CreateProducerDto): Promise<Producer> {
        if (!validateCpfCnpj(createProducerDto.cpfCnpj)) {
            throw new BadRequestException('Invalid CPF/CNPJ');
        }
        const producer = this.producerRepository.create(createProducerDto);
        return this.producerRepository.save(producer);
    }

    async createFarm(createFarmDto: CreateFarmDto): Promise<Farm> {
        const { arableArea, vegetationArea, totalArea } = createFarmDto;

        if (arableArea + vegetationArea > totalArea) {
            throw new BadRequestException('The sum of arable and vegetation areas cannot exceed the total area.');
        }

        const farm = this.farmRepository.create(createFarmDto);
        return this.farmRepository.save(farm);
    }


    async findAllProducers(): Promise<Producer[]> {
        try {
            return this.producerRepository.find();
        } catch (error) {
            this.logger.error('Erro ao buscar todos os produtores:', error.stack);
            throw error;
        }
    }

    async findOneProducer(id: number): Promise<Producer> {
        try {
            const producer = await this.producerRepository.findOne({ where: { id } });
            if (!producer) {
                throw new NotFoundException(`Producer with ID "${id}" not found`);
            }
            return producer;
        } catch (error) {
            this.logger.error(`Erro ao buscar produtor com ID ${id}:`, error.stack);
            throw error;
        }
    }

    async updateProducer(id: number, updateProducerDto: UpdateProducerDto): Promise<Producer> {
        try {
            const producer = await this.findOneProducer(id);
            this.producerRepository.merge(producer, updateProducerDto);
            return this.producerRepository.save(producer);
        } catch (error) {
            this.logger.error(`Erro ao atualizar produtor com ID ${id}:`, error.stack);
            throw error;
        }
    }

    async removeProducer(id: number): Promise<void> {
        try {
            const producer = await this.findOneProducer(id);
            await this.producerRepository.remove(producer);
        } catch (error) {
            this.logger.error(`Erro ao remover produtor com ID ${id}:`, error.stack);
            throw error;
        }
    }
}