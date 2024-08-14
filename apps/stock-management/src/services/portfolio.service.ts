
import axios, { AxiosResponse } from 'axios';
import { Portfolio, Position } from '../types/portfolio.interface';

const API_URL = 'http://localhost:3000/api/portfolio'

export const portfolioService = {
    getPortfolio,
    addPosition,
    updatePosition,
    removePosition
}

async function getPortfolio(): Promise<Portfolio> {
    try {
        const { data }: AxiosResponse<Portfolio> = await axios.get(`${API_URL}`);
        return data;
    } catch (err) {
        throw new Error('Failed to get portfolio');
    }
}

async function addPosition(position: Position): Promise<Portfolio> {
    try {
        const { data }: AxiosResponse<Portfolio> = await axios.post(`${API_URL}`, position);
        return data;
    } catch (err) {
        throw new Error('Failed to add position');
    }
}

async function updatePosition(position: Position): Promise<Portfolio> {
    try {
        const { data }: AxiosResponse<Portfolio> = await axios.put(`${API_URL}/${position._id}`, position);
        return data;
    } catch (err) {
        throw new Error('Failed to update position')
    }
}

async function removePosition(positionId: string): Promise<Portfolio> {
    try {
        const { data }: AxiosResponse<Portfolio> = await axios.delete(`${API_URL}/${positionId}`);
        return data
    } catch (err) {
        throw new Error('Failed to remove position');
    }
}