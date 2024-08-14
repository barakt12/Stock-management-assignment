import { makeAutoObservable } from 'mobx';
import { Quote, Stock } from '../types/stock.interface';
import { stockService } from '../services/stock.service';

export class StockStore {
    stocks: Stock[] = [];
    currentQuote: Quote | null = null;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    setStocks(stocks: Stock[]) {
        this.stocks = stocks;
    }

    setCurrentQuote(quote: Quote) {
        this.currentQuote = quote;
    }
    
    async getStocks() {
        if (this.stocks?.length) { return }

        try {
            const stocks = await stockService.getStocks()
            this.setStocks(stocks);
        } catch (err) {
            console.error(err);
        }
    }

    async getQuote(symbol: string) {
        try {
            const quote = await stockService.getQuote(symbol);
            this.setCurrentQuote(quote)
        } catch (err) {
            console.error(err);
        }
    }
}

export const stockStore = new StockStore();