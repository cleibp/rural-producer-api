import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateProducerDto {
  @IsString()
  @IsOptional()
  @Length(11, 20)
  cpfCnpj?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  name?: string;
}