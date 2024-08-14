import { PortfolioStore } from './../portfolio.store';
import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';

export function usePortfolioStore(): PortfolioStore {
    const { $portfolio } = useContext(MobXProviderContext);
    
    if (!$portfolio) {
        throw new Error('PortfolioStore is not available');
    }

    return $portfolio;
}