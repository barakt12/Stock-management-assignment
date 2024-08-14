import * as ReactDOM from 'react-dom/client';
import { Provider } from 'mobx-react';
import { Layout } from 'antd'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'antd/dist/reset.css';
import { stockStore } from './store/stock.store';
import AppHeader from './components/AppHeader';
import Portfolio from './pages/Portfolio';
import { portfolioStore } from './store/portfolio.store';
import StockDetails from './pages/StockDetails';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <Provider $stocks={ stockStore }
              $portfolio={ portfolioStore }>
        <Router>
            <Layout>
                <AppHeader />
                <main>
                    <Routes>
                        <Route index
                               path="/"
                               element={ <Portfolio />} />
                        <Route path="/:symbol" element={ <StockDetails /> } />   
                    </Routes>
                </main>
            </Layout>
        </Router>
    </Provider>
);
