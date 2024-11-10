import { all } from 'redux-saga/effects';
import { currencySaga } from './currencySaga';

export default function* rootSaga() {
    yield all([
        currencySaga(),
    ]);
}
