import { Body, Controller, Post, Delete, Param, Put, Get } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { AddPositionDto } from './dto/add-position.dto';
import { Portfolio } from './schemas/portfolio.schema';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) {}

    @Get()
    async getPortfolio(): Promise<Portfolio> {
        return this.portfolioService.getPortfolio();
    }
    
    @Post()
    async addPosition(@Body() addPositionDto: AddPositionDto) {
        return this.portfolioService.addPosition(addPositionDto);
    }
    
    @Put(':positionId')
    async updatePosition(@Param('positionId') positionId: string, 
                         @Body() updatePositionDto: UpdatePositionDto) {
        return this.portfolioService.updatePosition(positionId, updatePositionDto);
    }
    
    @Delete(':positionId')
    async removePosition(@Param('positionId') positionId: string) {
        return this.portfolioService.removePosition(positionId);
    }
    
}
