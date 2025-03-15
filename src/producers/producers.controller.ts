import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    ParseIntPipe,
    ValidationPipe,
    NotFoundException,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ProducersService } from './producers.service';
  import { CreateProducerDto } from './dtos/create-producer.dto';
  import { CreateFarmDto } from './dtos/create-farm.dto';
  import { Producer } from './entities/producer.entity';
  import { Farm } from './entities/farm.entity';
  import { UpdateProducerDto } from './dtos/update-producer.dto';
  import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiTags,
  } from '@nestjs/swagger';
  
  @ApiTags('producers')
  @Controller('producers')
  export class ProducersController {
    constructor(private readonly producersService: ProducersService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
      description: 'Produtor criado com sucesso',
      type: Producer,
    })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    async create(
      @Body(new ValidationPipe()) createProducerDto: CreateProducerDto,
    ): Promise<Producer> {
      return this.producersService.createProducer(createProducerDto);
    }
  
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Lista de produtores', type: [Producer] })
    async findAll(): Promise<Producer[]> {
      return this.producersService.findAllProducers();
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Produtor encontrado', type: Producer })
    @ApiNotFoundResponse({ description: 'Produtor não encontrado' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Producer> {
      try {
        return await this.producersService.findOneProducer(id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw error;
      }
    }
  
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Produtor atualizado com sucesso', type: Producer })
    @ApiNotFoundResponse({ description: 'Produtor não encontrado' })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body(new ValidationPipe()) updateProducerDto: UpdateProducerDto,
    ): Promise<Producer> {
      try {
        return await this.producersService.updateProducer(id, updateProducerDto);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw error; 
      }
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOkResponse({ description: 'Produtor removido com sucesso' })
    @ApiNotFoundResponse({ description: 'Produtor não encontrado' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      try {
        return await this.producersService.removeProducer(id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw error;
      }
    }
  
      @Post(':producerId/farms')
      @HttpCode(HttpStatus.CREATED)
      @ApiCreatedResponse({ description: 'Fazenda criada com sucesso', type: Farm })
      @ApiBadRequestResponse({ description: 'Dados inválidos' })
      async createFarm(
          @Param('producerId', ParseIntPipe) producerId: number,
          @Body(new ValidationPipe()) createFarmDto: CreateFarmDto,
      ): Promise<Farm> {
          createFarmDto.producerId = producerId;
          return this.producersService.createFarm(createFarmDto);
      }
  }