import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Portfolio extends Document {
    @Prop({
        type: [
            {
                stockSymbol: { type: String, required: true },
                quantity: { type: Number, required: true },
                purchasePrice: { type: String, required: true },
            },
        ],
        default: [],
    })
    positions: {
        _id?: string;
        stockSymbol: string;
        quantity: number;
        purchasePrice: string;
    }[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);