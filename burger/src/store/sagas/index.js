import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from "../actions/actionTypes";
import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from './auth';

import {
    purchaseBurgerSaga,
    fetchOrdersSaga,
    deleteOrderSaga
} from './order';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchOrder() {
    yield all([
        takeEvery(actionTypes.PURCHASE_INITIATE_BURGER, purchaseBurgerSaga),
        takeEvery(actionTypes.FETCH_ORDERS_INITIATE, fetchOrdersSaga),
        takeEvery(actionTypes.DELETE_ORDER_INITIATE, deleteOrderSaga)
    ]);
}

