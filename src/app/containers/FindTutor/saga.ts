import { PayloadAction } from '@reduxjs/toolkit';
import apiCall from 'app/api/apiCall';
import routes from 'app/api/routes';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

export function* queryTutorSaga(data: PayloadAction<any>) {
  yield put(actions.setLoading(true));
  const response = yield call(apiCall, {
    route: routes.user.findTutor,
    method: 'POST',
    isSecureRoute: true,
    body: data.payload,
  });
  yield put(actions.setLoading(false));
  yield put(actions.setTutors(response.tutors));
}

export function* findTutorSaga() {
  yield takeLatest(actions.queryTutor.type, queryTutorSaga);
}
