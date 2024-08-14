export interface Portfolio {
    _id: string;
    positions: Position[];
}

export interface Position {
    _id: string;
    stockSymbol: string;
    quantity: number;
    purchasePrice: string;
}