import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Spin, Typography } from 'antd';
import { useStockStore } from '../store/hooks/useStockStore';
import { Quote } from '../types/stock.interface';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { formatNumber } from '../utils/format-number';

const { Title, Paragraph } = Typography;

const MODE = {
    DEFAULT: 'default',
    LOADING: 'loading',
}

const StockDetails: React.FC = observer(() => {
    const { symbol } = useParams<{ symbol: string }>();
    const $stocks = useStockStore();
    const navigate = useNavigate();

    const [mode, setMode] = useState(MODE.LOADING);

    useEffect(() => {
        if (symbol) {
            $stocks.getQuote(symbol)
                .then(() => setMode(MODE.DEFAULT))
        }
    }, [symbol, $stocks]);

    const quote: Quote | null = $stocks.currentQuote;



    function renderDefault() {
        if (quote && MODE.DEFAULT) {
            return (
                    <>
                        <Title level={ 4 }>{ quote.name }</Title>
                        <Paragraph>Price: ${ formatNumber(quote.price) }</Paragraph>
                        <Paragraph>Change: ${ quote.change } ({ quote.changesPercentage }%)</Paragraph>
                        <Paragraph>Day Low: ${ formatNumber(quote.dayLow) }</Paragraph>
                        <Paragraph>Day High: ${ formatNumber(quote.dayHigh) }</Paragraph>
                        <Paragraph>Year Low: ${ formatNumber(quote.yearLow) }</Paragraph>
                        <Paragraph>Year High: ${ formatNumber(quote.yearHigh) }</Paragraph>
                        <Paragraph>Market Cap: ${ formatNumber(quote.marketCap) }</Paragraph>
                    </>
            )
        }
    }

    return (
        <div className="stock-details">
            <Typography>
                <Title>Stock Details</Title>
            </Typography>
            <Button onClick={() => navigate('/')} style={{ marginBottom: '20px' }}
                    icon={ <LeftOutlined />}
                    type="link"
                    className="navigate-back-btn">
                Back to Portfolio
            </Button>
            <Card title={ mode === MODE.DEFAULT && quote ? `Symbol: ${quote.symbol}` : '' }
                  loading={ mode === MODE.LOADING }>
                { renderDefault() }
            </Card>
        </div>
    );
});

export default StockDetails;
