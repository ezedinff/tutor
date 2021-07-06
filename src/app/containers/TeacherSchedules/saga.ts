import { PayloadAction } from '@reduxjs/toolkit';
import apiCall from 'app/api/apiCall';
import routes from 'app/api/routes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as userActions } from '../UserLayout/slice';
import { actions as appActions } from '../AppMessages/slice';
import { IAvialabilityAPP, TDaysKey } from './types';
import { appAvialabilityToApi } from './util';
import { getErrorMessage } from 'app/utils';

// export function* doSomething() {}

export function* updateAvialabilitySaga(
  action: PayloadAction<{
    day: TDaysKey;
    newAvailabilitySchedules: IAvialabilityAPP;
  }>,
) {
  const { newAvailabilitySchedules, day } = action.payload;
  const newScheduleForAPI = appAvialabilityToApi(newAvailabilitySchedules);
  try {
    const updatedUser = yield call(apiCall, {
      method: 'PUT',
      route: routes.user.update,
      body: { avialabilitySchedule: newScheduleForAPI },
      isSecureRoute: true,
    });

    // when a user's schedule is updated useEffect in TeacherSchedule will catch the changes
    yield put(userActions.setUser(updatedUser));
  } catch (error) {
    yield put(actions.setADaysLoadingState({ day, value: false }));
    yield put(
      appActions.setAppAlert({
        severity: 'error',
        message: getErrorMessage(error),
        autoHideIn: 3000,
      }),
    );
  }
}

export function* teacherSchedulesSaga() {
  yield takeLatest(
    actions.updateAvialabilityChanges.type,
    updateAvialabilitySaga,
  );
}
