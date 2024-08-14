import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
    imports: [HttpModule],
    providers: [StockService],
    controllers: [StockController],
    exports: [StockService],
})
export class StockModule {}