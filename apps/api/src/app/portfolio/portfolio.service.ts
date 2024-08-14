import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio } from './schemas/portfolio.schema';
import { AddPositionDto } from './dto/add-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PortfolioService {
    constructor(@InjectModel(Portfolio.name) private portfolioModel: Model<Portfolio>) {}

    private async createPortfolio(): Promise<Portfolio> {
        const newPortfolio = new this.portfolioModel({ positions: [] });
        return newPortfolio.save();
    }
    
    async getPortfolio(): Promise<Portfolio | null> {
        try {
            const portfolio = await this.portfolioModel.findOne();
            if (!portfolio) {
                return await this.createPortfolio()
            }

            return portfolio
        } catch (err) {
            throw new Error('Could not find portfolio')
        }
    }
    
    async addPosition(addPositionDto: AddPositionDto): Promise<Portfolio> {
        try {
            const portfolio = await this.getPortfolio();
            portfolio.positions.push(addPositionDto);
            return await portfolio.save(); 
        } catch (err) {
            throw new Error('Could not add position');
        }
    }
    
    async updatePosition(positionId: string, updatePositionDto: UpdatePositionDto): Promise<Portfolio> {
        const portfolio = await this.getPortfolio();
        const positionIndex = portfolio.positions.findIndex(position => position._id.toString() === positionId);
        
        if (positionIndex === -1) {
            throw new NotFoundException('Position not found');
        }
        
        try {
            portfolio.positions[positionIndex] = {
                ...portfolio.positions[positionIndex],
                ...updatePositionDto,
            };   
            return await portfolio.save();
        } catch (err) {
            throw new Error('Could not update position');
        }
    }
    
    async removePosition(positionId: string): Promise<Portfolio> {
        const portfolio = await this.getPortfolio();
        
        try {
            portfolio.positions = portfolio.positions.filter((position) => position._id.toString() !== positionId);
            return await portfolio.save();
        } catch(err) {
            throw new Error('Could not remove position');
        }
    }
}