import apiCall from 'app/api/apiCall';
import routes from 'app/api/routes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { IUser } from './types';
import { actions as appActions } from '../AppMessages/slice';

export function* getUserSaga() {
  try {
    const user: IUser = yield call(apiCall, {
      method: 'GET',
      route: routes.auth.me,
      isSecureRoute: true,
    });
    yield put(actions.setUser(user));
  } catch (error) {
    yield put(
      appActions.setAppAlert({
        message:
          error.message || 'Failed to retrive your information. Please reload.',
        severity: 'error',
      }),
    );
  }
}

export function* logOutUserSaga() {
  window.localStorage.clear();
  yield put(appActions.setRedirectTo('/'));
}

export function* userLayoutSaga() {
  yield takeLatest(actions.getCurrentUser, getUserSaga);
  yield takeLatest(actions.logOutUser.type, logOutUserSaga);
}
