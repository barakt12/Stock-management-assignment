import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
    constructor(private readonly stockService: StockService) {}
    
    @Get()
    async getStockList() {
        return this.stockService.getStockList();
    }
    
    @Get(':id')
    async getQuote(@Param('id') symbol: string) {
        return this.stockService.getQuote(symbol);
    }
}