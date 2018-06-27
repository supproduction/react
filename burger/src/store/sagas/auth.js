import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import axios from "axios";

import * as actions from "../actions/index";

const apiKey = "AIzaSyCyeW4jF5XIMIy-oifudErY6Y3VSUPOjDo";

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'localId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());

    const authData = {
        email: action.email,
        password: action.pass,
        returnSecureToken: true
    };
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
    if (!action.isSignup) {
        url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
    }
    try {
        const response = yield axios.post(url, authData);

        const expirationDate = yield new Date(
            new Date().getTime() + response.data.expiresIn * 1000
        );
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('localId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch(err) {
        yield put(actions.authFail(err.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');

    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const localId = yield localStorage.getItem('localId');
            yield put(actions.authSuccess(token, localId));
            yield put(
                actions.checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000)
            );
        }
    }
}