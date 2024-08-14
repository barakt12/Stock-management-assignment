import { Document } from 'mongoose';

export interface Position extends Document {
    _id: string;
    stockSymbol: string;
    quantity: number;
    purchasePrice: string;
}

export interface Portfolio extends Document {
    _id: string;
    positions: Position[];
}