
import axios, { AxiosResponse } from 'axios';
import { Quote, Stock } from '../types/stock.interface';

const API_URL = 'http://localhost:3000/api/stocks'

export const stockService = {
    getStocks,
    getQuote
}

async function getStocks(): Promise<Stock[]> {
    try {
        const { data }: AxiosResponse<Stock[]> = await axios.get(`${API_URL}`);
        return data
    } catch (err) {
        throw new Error('Failed to get stocks');
    }
}

async function getQuote(symbol: string): Promise<Quote> {
    try {
        const { data }: AxiosResponse<Quote> = await axios.get(`${API_URL}/${symbol}`);
        return data
    } catch (err) {
        throw new Error('Failed to get quote');
    }
}