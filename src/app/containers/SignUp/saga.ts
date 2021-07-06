import { PayloadAction } from '@reduxjs/toolkit';
import apiCall from 'app/api/apiCall';
import routes from 'app/api/routes';
import {
  getErrorMessage,
  getNextVerificationSmsState,
  setAuthTokens,
} from 'app/utils';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { roles } from 'utils/constants';
import { actions as appMessageActions } from '../AppMessages/slice';
import { signupStorageNames } from './constants';
import { selectFinishStage } from './selectors';
import { actions } from './slice';
import {
  FinishSignupStages,
  SendVerificationPayload,
  StepName,
  VerificationSmsStateType,
  VerifyAndFinishSignupPayload,
} from './types';

function* sendVerificationSMS(data: PayloadAction<SendVerificationPayload>) {
  try {
    const reCaptchaToken = yield window.recaptchaVerifier?.verify();
    const body = { phoneNumber: data.payload.phoneNumber, reCaptchaToken };

    yield call(apiCall, {
      method: 'POST',
      route: routes.phoneVerification.sendSMS,
      isSecureRoute: false,
      body,
    });

    // Add to sms count and last resent
    const nextVerificationSmsState: VerificationSmsStateType = getNextVerificationSmsState();
    localStorage.setItem(
      signupStorageNames.verificationSms,
      JSON.stringify(nextVerificationSmsState),
    );
    yield put(actions.setVericationSms(nextVerificationSmsState));

    yield put(actions.setCurrentSignupFormIndex(3));
  } catch (error) {
    console.log(error);
    yield put(
      appMessageActions.setAppAlert({
        message: getErrorMessage(error),
        severity: 'error',
      }),
    );
  }
  yield put(actions.setSubmitInProgress(false));
}

function* verifyAndFinishSignupSaga(
  data: PayloadAction<VerifyAndFinishSignupPayload>,
) {
  // get finish stage state
  const finishStage: FinishSignupStages = yield select(state =>
    selectFinishStage(state),
  );

  let step: StepName = 'code';

  try {
    // Check phonr code only if last one haven't succeed
    if (!finishStage.code.success) {
      // Show code verification in progress
      yield put(
        actions.setASignUpStage({
          name: 'code',
          state: { success: false, error: false, inProgress: true },
        }),
      );
      const body = {
        phoneNumber: data.payload.phoneNumber,
        code: data.payload.code,
      };
      // make api call to verify phoneCode
      yield call(apiCall, {
        method: 'POST',
        route: routes.phoneVerification.verifyCode,
        isSecureRoute: false,
        body,
      });
      yield put(
        actions.setASignUpStage({
          name: 'code',
          state: { success: true, error: false, inProgress: false },
        }),
      );
    }

    // move to crating account if it wasn't successfull last time or if it is first time
    if (!finishStage.account.success) {
      step = 'account'; // Change step name
      yield put(
        actions.setASignUpStage({
          name: 'account',
          state: { success: false, error: false, inProgress: true },
        }),
      );

      // Remove unwanted values from data
      const newUser = Object.assign(
        {},
        { ...data.payload, code: undefined, confirmPassword: undefined },
      );

      const response = yield call(apiCall, {
        method: 'POST',
        route: routes.user.create,
        isSecureRoute: false,
        body: newUser,
      });
      console.log(response);
      yield put(
        actions.setASignUpStage({
          name: 'account',
          state: { success: true, error: false, inProgress: false },
        }),
      );
      yield delay(500);
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
    }
  } catch (error) {
    yield put(
      appMessageActions.setAppAlert({
        message: getErrorMessage(error),
        autoHideIn: 4000,
        severity: 'error',
      }),
    );

    yield put(
      actions.setASignUpStage({
        name: step,
        state: { success: false, error: true, inProgress: false },
      }),
    );
  }
  yield put(actions.setSubmitInProgress(false));
}

export function* signUpSaga() {
  yield takeLatest(actions.sendVerificationSMS.type, sendVerificationSMS);
  yield takeLatest(
    actions.verifyAndFinishSignup.type,
    verifyAndFinishSignupSaga,
  );
}
