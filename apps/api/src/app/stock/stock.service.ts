import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import { QuoteResponse, StockResponse } from './stock.interface';

@Injectable()
export class StockService {
    private readonly baseUrl = 'https://financialmodelingprep.com/api/v3';
    private readonly axiosInstance: AxiosInstance;
    
    constructor(private readonly httpService: HttpService) {
        this.axiosInstance = this.httpService.axiosRef;
        
        // Append the api key to each request
        this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            if (config.url && !config.url.includes('apikey=')) {
                config.url += (config.url.includes('?') ? '&' : '?') + `apikey=${process.env.FMP_API_KEY}`;
            }
            return config;
        });
    };
    
    async getStockList(): Promise<StockResponse[]> {
        try {
            const url = `${this.baseUrl}/stock/list`;
            const response = await firstValueFrom(this.httpService.get<StockResponse[]>(url));
            return response.data;
        } catch (err) {
            throw new Error(err)
        }
    };
    
    async getQuote(symbol: string): Promise<QuoteResponse> {
        try {
            const url = `${this.baseUrl}/quote/${symbol}`;
            const response = await firstValueFrom(this.httpService.get<QuoteResponse>(url));

            // Api always returns an array
            return response.data[0];
        } catch (err) {
            throw new Error('Failed to fetch stock data');
        }
    };
}