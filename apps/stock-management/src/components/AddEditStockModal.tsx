import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Input, Button, AutoComplete } from 'antd';
import { debounce } from 'lodash';
import { useStockStore } from '../store/hooks/useStockStore';
import { Position } from '../types/portfolio.interface';

interface AddEditStockModalProps {
    isVisible: boolean;
    onCancel: () => void;
    onSave: (stock: Position) => void;
    currentPosition: Position | null;
}

const AddEditStockModal: React.FC<AddEditStockModalProps> = observer(({ isVisible, onCancel, onSave, currentPosition }) => {
    const [form] = Form.useForm();
    const $stocks = useStockStore();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredStockOptions, setFilteredStockOptions] = useState<{ label: string, value: string}[]>([]);

    useEffect(() => {
        if (currentPosition) {
            form.setFieldsValue({
                stockSymbol: currentPosition.stockSymbol,
                quantity: currentPosition.quantity,
                purchasePrice: currentPosition.purchasePrice
            });
        } else {
            form.resetFields();
        }
    }, [currentPosition, form]);

    const stockOptions = useMemo(() => {
        return $stocks.stocks.map(stock => ({ label: `${stock.symbol} - ${stock.name}`, value: stock.symbol, name: stock.name }))
    }, [$stocks.stocks]);
    

    const onSearch = useCallback(
        debounce((value: string) => {
            const filteredOptions = stockOptions.filter(stock => {
                return stock.value?.toLowerCase().includes(value.toLowerCase()) || stock.name?.toLowerCase().includes(value.toLowerCase())
            })
            setFilteredStockOptions(filteredOptions);
            setSearchTerm(value);
        }, 100), [stockOptions]);

    const onFinish = async (position: Position) => {
        position = await form.validateFields()
        onSave(position);
        form.resetFields();
    };

    const validateSymbol = (rule: any, value: string) => {
        if (!value || stockOptions.some(stock => stock.value === value)) {
            return Promise.resolve();
        }
        return Promise.reject('The symbol entered is not valid.');
    };

    return (
        <Modal title="Add/Edit Stock"
               open={ isVisible }
               onCancel={ () => {
                   onCancel()
                   form.resetFields()
               } }
               footer={ null }>
            <Form form={ form } 
                  onFinish={ onFinish }
                  className="stock-form"
                  layout="vertical">
                <Form.Item name="stockSymbol"
                           label="Stock Symbol"
                           rules={[{ required: true, message: 'Please select a stock symbol', validator: validateSymbol }]}>
                    <AutoComplete options={ filteredStockOptions }
                                  onSearch={ onSearch }
                                  disabled={ !!currentPosition?.stockSymbol }
                                  value={ currentPosition?.stockSymbol }
                                  filterOption={(searchTerm, option) => {
                                        if (!option) { return false }
                                        return option?.label.toLowerCase()?.includes(searchTerm?.toLowerCase()) } }>
                        <Input />
                    </AutoComplete>
                </Form.Item>
                <Form.Item name="quantity"
                           label="Quantity"
                           rules={[{ required: true, message: 'Please enter the quantity' }]}>
                    <Input type="number"
                           min={ 1 } />
                </Form.Item>
                <Form.Item name="purchasePrice"
                           label="Purchase Price"
                           rules={[{ required: true, message: 'Please enter the purchase price' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" 
                            htmlType="submit">Save</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default AddEditStockModal;