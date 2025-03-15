import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
    @ApiProperty({ description: 'CPF ou CNPJ do produtor' })
    @IsNotEmpty()
    @IsString()
    @Length(11, 20)
    cpfCnpj: string;

    @ApiProperty({ description: 'Nome do produtor' })
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    name: string;
}