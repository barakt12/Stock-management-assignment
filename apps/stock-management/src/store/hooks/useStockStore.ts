import { StockStore } from './../stock.store';
import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';

export function useStockStore(): StockStore {
    const { $stocks } = useContext(MobXProviderContext);

    if (!$stocks) {
        throw new Error('StockStore is not available');
    }
    
    return $stocks;
}