import { IsNotEmpty, IsString, IsNumber, Min, Length } from 'class-validator';

export class CreateFarmDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    farmName: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    city: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 2)
    state: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    totalArea: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    arableArea: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    vegetationArea: number;

    @IsNotEmpty()
    @IsNumber()
    producerId: number;
}