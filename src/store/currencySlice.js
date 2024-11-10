import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        rates: {},
        selectedCurrencies: { base: 'USD', target: 'EUR' },
        conversionResult: null,
        loading: false,
        error: null,
    },
    reducers: {
        fetchRatesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchRatesSuccess: (state, action) => {
            state.rates = action.payload;
            state.loading = false;
        },
        fetchRatesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setConversionResult: (state, action) => {
            state.conversionResult = action.payload;
        },
        selectBaseCurrency: (state, action) => {
            state.selectedCurrencies.base = action.payload;
        },
        selectTargetCurrency: (state, action) => {
            state.selectedCurrencies.target = action.payload;
        },
    },
});

export const {
    fetchRatesRequest,
    fetchRatesSuccess,
    fetchRatesFailure,
    setConversionResult,
    selectBaseCurrency,
    selectTargetCurrency,
} = currencySlice.actions;

export default currencySlice.reducer;
