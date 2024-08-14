import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { StockModule } from './stock/stock.module';

@Module({
    imports: [
        DatabaseModule,
        PortfolioModule,
        StockModule,
    ],
})
export class AppModule {}
