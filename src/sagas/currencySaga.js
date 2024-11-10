import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
    fetchRatesRequest,
    fetchRatesSuccess,
    fetchRatesFailure,
    selectBaseCurrency,
} from '../store/currencySlice';

function* fetchRatesSaga() {
    try {
        const baseCurrency = yield select((state) => state.currency.selectedCurrencies.base);
        const targetCurrency = yield select((state) => state.currency.selectedCurrencies.target);

        // Печать для отладки
        console.log(`Fetching rates for: ${baseCurrency} to ${targetCurrency}`);

        const response = yield call(fetch, `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        // Проверка на успешный ответ
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = yield response.json();

        const dates = Object.keys(data.rates); // Даты
        const rates = Object.values(data.rates); // Курсы

        yield put(fetchRatesSuccess({ dates, rates }));
    } catch (error) {
        console.error('Error fetching rates:', error); // Логирование ошибки
        yield put(fetchRatesFailure(error.message));
    }
}


export function* currencySaga() {
    yield takeLatest(fetchRatesRequest.type, fetchRatesSaga);
    yield takeLatest(selectBaseCurrency.type, fetchRatesSaga);
}
