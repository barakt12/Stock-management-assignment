import { IsNumber, IsOptional, IsNumberString, IsString, IsNotEmpty } from 'class-validator';

export class UpdatePositionDto {
    @IsNotEmpty()
    @IsString()
    stockSymbol: string;

    @IsOptional()
    @IsNumber()
    quantity?: number;
    
    @IsOptional()
    @IsNumberString()
    purchasePrice?: string;
}