import { makeAutoObservable } from 'mobx';
import { Position } from '../types/portfolio.interface';
import { portfolioService } from '../services/portfolio.service';

export class PortfolioStore {
    positions: Position[] = [];

    constructor() {
        makeAutoObservable(this);
    }
    
    setPositions(positions: Position[]) {
        this.positions = positions;
    }

    async getPortfolio() {
        if (this.positions.length) { return }
        
        try {
            const portfolio = await portfolioService.getPortfolio();
            this.setPositions(portfolio.positions);
        } catch (err) {
            console.error(err);
        }
    }

    async addPosition(position: Position) {
        try {
            const updatedPortfolio = await portfolioService.addPosition(position);
            this.setPositions(updatedPortfolio.positions);
        } catch (err) {
            console.error(err);
        }
    }

    async updatePosition(position: Position) {
        try {
            const updatedPortfolio = await portfolioService.updatePosition(position);
            this.setPositions(updatedPortfolio.positions);
        } catch (err) {
            console.error(err);
        }
    }

    async removePosition(positionId: string) {
        try {
            const updatedPortfolio = await portfolioService.removePosition(positionId);
            this.setPositions(updatedPortfolio.positions);
        } catch (err) {
            console.error(err);
        }
    }
}

export const portfolioStore = new PortfolioStore();
