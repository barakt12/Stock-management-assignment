import { IsString, IsNumber, IsNumberString, IsNotEmpty } from 'class-validator';

export class AddPositionDto {
    @IsString()
    @IsNotEmpty()
    stockSymbol: string;
    
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
    
    @IsNumberString()
    @IsNotEmpty()
    purchasePrice: string;
}