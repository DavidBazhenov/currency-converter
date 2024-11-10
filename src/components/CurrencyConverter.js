import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchRatesRequest,
    selectBaseCurrency,
    selectTargetCurrency
} from '../store/currencySlice';

const CurrencyConverter = () => {
    const dispatch = useDispatch();
    const { rates, selectedCurrencies, loading, error } = useSelector((state) => state.currency);
    const [amount, setAmount] = useState(1);  // Состояние для ввода суммы

    useEffect(() => {
        dispatch(fetchRatesRequest());
    }, [dispatch, selectedCurrencies.base, selectedCurrencies.target]);

    // Обработчики изменения валют
    const handleBaseCurrencyChange = (event) => {
        dispatch(selectBaseCurrency(event.target.value));
    };

    const handleTargetCurrencyChange = (event) => {
        dispatch(selectTargetCurrency(event.target.value));
    };

    // Обработчик изменения суммы для конвертации
    const handleAmountChange = (event) => {
        const value = event.target.value;
        if (value >= 0) {
            setAmount(value);
        }
    };

    // Массив валют для выбора
    const currencyOptions = [
        'USD', 'EUR', 'RUB', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'MXN'
    ];

    // Функция для подсчета конвертированной суммы
    const getConversionResult = () => {
        const { base, target } = selectedCurrencies;
        if (rates && rates.dates && rates.rates) {
            const indexOfBase = rates.dates?.indexOf(base);
            const indexOfTarget = rates.dates?.indexOf(target);
            const rate = rates.rates[indexOfTarget] / rates.rates[indexOfBase];
            return (amount * rate).toFixed(2);
        }
        return 0;
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Currency Converter</h1>
            {loading && <div className=' absolute w-[95vw] h-[70vh] flex items-center justify-center'><div className="animate-spin h-20 w-20 border-b-2 border-gray-900 rounded-full"></div></div>}
            {error && <p>Error loading rates: {error}</p>}

            <div className="flex space-x-4 mb-4">
                {/* Выбор базовой валюты */}
                <select value={selectedCurrencies.base} onChange={handleBaseCurrencyChange} className="border p-2 rounded">
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>

                {/* Выбор целевой валюты */}
                <span className="text-lg">to</span>

                <select value={selectedCurrencies.target} onChange={handleTargetCurrencyChange} className="border p-2 rounded">
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>

            {/* Ввод суммы для конвертации */}
            <div className="mb-4">
                <label htmlFor="amount" className="text-lg">Amount</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    className="border p-2 rounded mt-2"
                    min="0"
                />
            </div>

            {/* Результат конвертации */}
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Converted Amount:</h2>
                <p>
                    {amount} {selectedCurrencies.base} = {getConversionResult()} {selectedCurrencies.target}
                </p>
            </div>
        </div>
    );
};

export default CurrencyConverter;
