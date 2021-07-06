import apiCall from 'app/api/apiCall';
import routes from 'app/api/routes';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as appMessageActions } from 'app/containers/AppMessages/slice';
import { LoginActionPayload } from './types';
import { getErrorMessage, setAuthTokens } from 'app/utils';
import { roles } from 'utils/constants';

function* initiateLogInSaga(data: PayloadAction<LoginActionPayload>) {
  try {
    const body = data.payload;
    const response = yield call(apiCall, {
      method: 'POST',
      route: routes.auth.login,
      isSecureRoute: false,
      body,
    });

    if (
      typeof response.token === 'string' &&
      typeof response.refreshToken === 'string' &&
      typeof response.role === 'string'
    ) {
      yield call(setAuthTokens, response.token, response.refreshToken);
      const roleBasedRoute =
        response.role === roles.TEACHER ? '/dashboard' : '/client';
      yield put(appMessageActions.setRedirectTo(roleBasedRoute));
    }

    // yield put(
    //   appMessageActions.setAppAlert({
    //     message: 'Log In Successfull',
    //     severity: 'success',
    //   }),
    // );
  } catch (error) {
    yield put(
      appMessageActions.setAppAlert({
        message: getErrorMessage(error),
        severity: 'error',
        autoHideIn: 4000,
      }),
    );
  }

  yield put(actions.setLoggingIn(false));
}

export function* logInSaga() {
  yield takeLatest(actions.loginAction.type, initiateLogInSaga);
}
