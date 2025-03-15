import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from './producers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producer } from './entities/producer.entity';
import { Farm } from './entities/farm.entity';
import { Repository } from 'typeorm';
import { CreateProducerDto } from './dtos/create-producer.dto';
import { BadRequestException } from '@nestjs/common';

const mockProducerRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
});

const mockFarmRepository = () => ({});

type MockRepository<T extends object = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ProducersService', () => {
    let producersService: ProducersService;
    let producerRepository: MockRepository<Producer>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProducersService,
                {
                    provide: getRepositoryToken(Producer),
                    useFactory: mockProducerRepository,
                },
                {
                    provide: getRepositoryToken(Farm),
                    useFactory: mockFarmRepository,
                },
            ],
        }).compile();

        producersService = module.get<ProducersService>(ProducersService);
        producerRepository = module.get(getRepositoryToken(Producer));
    });

    it('should be defined', () => {
        expect(producersService).toBeDefined();
    });

    describe('createProducer', () => {
        it('should create a producer successfully', async () => {
            const createProducerDto: CreateProducerDto = {
                cpfCnpj: '12345678909',
                name: 'John Doe',
            };

            (producerRepository.create as jest.Mock).mockReturnValue(createProducerDto);
            (producerRepository.save as jest.Mock).mockResolvedValue({ id: 1, ...createProducerDto });

            const result = await producersService.createProducer(createProducerDto);

            expect(producerRepository.create).toHaveBeenCalledWith(createProducerDto);
            expect(producerRepository.save).toHaveBeenCalledWith(createProducerDto);
            expect(result).toEqual({ id: 1, ...createProducerDto });
        });

        it('should throw BadRequestException if CPF/CNPJ is invalid', async () => {
            const createProducerDto: CreateProducerDto = {
                cpfCnpj: 'invalid',
                name: 'John Doe',
            };

            await expect(producersService.createProducer(createProducerDto)).rejects.toThrowError(BadRequestException);
        });
    });
});