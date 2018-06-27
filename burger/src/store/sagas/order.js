import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
        yield put(actions.resetIngredients());
    } catch(error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    try {
        const res = yield axios.get(`/orders.json${queryParams}`);
        const fetchOrders = [];
        for (let key in res.data) {
            fetchOrders.push({...res.data[key], id: key});
        }
        yield put(actions.fetchOrdersSuccess(fetchOrders));
    } catch(err) {
        yield put(actions.fetchOrdersFail(err));
    }
}

export function* deleteOrderSaga(action) {
    yield put(actions.deleteOrderStart(action.orderId));
    yield axios.delete(`/orders/${action.orderId}.json?auth=${action.token}`);
}