import React, { useEffect, useState } from 'react';
import { Button, Table, Typography, Space, Spin } from 'antd';
import { observer } from 'mobx-react';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { PlusOutlined } from '@ant-design/icons'
import { Position } from '../types/portfolio.interface';
import { useStockStore } from '../store/hooks/useStockStore';
import { usePortfolioStore } from '../store/hooks/usePortfolioStore';
import AddEditStockModal from '../components/AddEditStockModal';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router';
import { formatNumber } from '../utils/format-number';

const MODE = {
    VIEW: 'view',
    EDIT: 'edit',
    ADD: 'add',
}

const Portfolio: React.FC = observer(() => {
    const $stocks = useStockStore();
    const $portfolio = usePortfolioStore();
    const navigate = useNavigate();

    if (!$portfolio) {
        return (
            <Spin />
        )
    }

    const [mode, setMode] = useState(MODE.VIEW);
    const [currentPosition, setCurrentPosition] = useState<Position | null>(null);

    useEffect(() => {
        $portfolio.getPortfolio();
        $stocks?.getStocks();
    }, [])
    
    const onAddPosition = async () => {
        setMode(MODE.ADD);
    }

    const onEditPosition = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, position: Position) => {
        e.stopPropagation();
        setCurrentPosition(position);
        setMode(MODE.EDIT);
    }

    const onRemovePosition = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, symbol: string) => {
        e.stopPropagation();
        $portfolio.removePosition(symbol);
    }
    
    const onSubmit = async (position: Position) => {
        try {
            if (!currentPosition) {
                $portfolio.addPosition(position);
            } else {
                $portfolio.updatePosition({...position, _id: currentPosition._id });
            }
            setMode(MODE.VIEW);
        } catch (err) {
            console.error(err);
        } finally {
            setCurrentPosition(null)
        }
    };

    const onCancel = () => {
        setMode(MODE.VIEW);
    };
    
    const columns: ColumnsType<Position> = [
        { 
            width: 32,
            render: (text: string, record: Position) => (
                <img src={`https://eodhd.com/img/logos/US/${record.stockSymbol?.toUpperCase()}.png`}
                     alt=""
                     className="stock-icon" />)
        },
        {
            title: 'Symbol', 
            dataIndex: 'stockSymbol', 
            key: 'stockSymbol',
            sorter: (a: Position, b: Position) => a.stockSymbol.localeCompare(b.stockSymbol),
            render: (text: string, record: Position) => (<b>{record.stockSymbol?.toUpperCase()}</b>) 
        },
        { 
            title: 'Quantity', 
            dataIndex: 'quantity', 
            key: 'quantity',
            sorter: (a: Position, b: Position) => a.quantity - b.quantity
        },
        { 
            title: 'Purchase Price', 
            dataIndex: 'purchasePrice', 
            key: 'purchasePrice',
            sorter: (a: Position, b: Position) => parseFloat(a.purchasePrice) - parseFloat(b.purchasePrice),
            render: (text: string) => (`$${formatNumber(parseFloat(text))}`) 
        },
        { 
            align: 'right', 
            width: 150, 
            render: (_: unknown, record: Position) => (
                <Space>
                    <Button onClick={ (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onEditPosition(e, record) }>Edit</Button>
                    <Button onClick={ (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onRemovePosition(e, record._id) }>Remove</Button>
                </Space>
            ),
        },
    ];
    
    return (
        <div className='portfolio'>
            <div className='portfolio-header'>
                <Typography>
                    <Title>Trade activity</Title>
                    <Paragraph >Your portfolio positions.</Paragraph>
                </Typography>
                <Button type="primary"
                        icon={ <PlusOutlined /> }
                        onClick={ onAddPosition }>Add Trade</Button>
            </div>
            <Table dataSource={ $portfolio.positions }
                   columns={ columns }
                   pagination={{ pageSize: 10 }}
                   rowKey="stockSymbol"
                   style={{ marginTop: 20 }}
                   onRow={(record) => ({ onClick: () => navigate(`/${record.stockSymbol}`) })}
                   bordered />
            <AddEditStockModal isVisible={ mode !== MODE.VIEW}
                               onCancel={ onCancel }
                               onSave={ onSubmit }
                               currentPosition={ mode === MODE.EDIT ? currentPosition : null} />
        </div>
    );
});

export default Portfolio;