import { PayloadAction } from '@reduxjs/toolkit';
import apiCall from 'app/api/apiCall';
import uploadApi from 'app/api/uploadApi';
import routes from 'app/api/routes';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as userActions } from 'app/containers/UserLayout/slice';
import { actions as appActions } from 'app/containers/AppMessages/slice';
import {
  ImportantDocumentTypes,
  IProfileValuesOnly,
  ReducerUploadKeys,
  uploadAFilePayload,
} from './types';
import { getErrorMessage } from 'app/utils';
import { eventChannel, END } from 'redux-saga';
import { UploadAPIConfigType } from 'app/api/types';

export function* updateTeacherProfileSaga(
  data: PayloadAction<IProfileValuesOnly>,
) {
  try {
    const updatedUser = yield call(apiCall, {
      method: 'PUT',
      route: routes.user.update,
      body: data.payload,
      isSecureRoute: true,
    });
    yield put(userActions.setUser(updatedUser));
    yield put(
      appActions.setAppAlert({
        severity: 'success',
        message: 'All changes are saved',
        autoHideIn: 3000,
      }),
    );
  } catch (error) {
    yield put(
      appActions.setAppAlert({
        severity: 'error',
        message: getErrorMessage(error),
      }),
    );
  }

  yield put(actions.setSavingProfile(false));
}

const createUploader = (config: UploadAPIConfigType) => {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });

  const uploadPromise = uploadApi(config, (event: ProgressEvent) => {
    if (event.total === event.loaded) {
      emit(END);
    }
    const loaded = Math.round((event.loaded * 100) / event.total);
    emit(loaded);
  });

  return [uploadPromise, chan];
};

function* watchOnProgress(chan, reducerObjKey: ReducerUploadKeys) {
  while (true) {
    const data = yield take(chan);
    if (typeof data === 'number') {
      yield put(
        actions.setUploadProgress({
          objectKey: reducerObjKey,
          value: { uploading: true, progress: data, newUploaded: false },
        }),
      );
    }
  }
}

export function* uploadAFileSaga(data: PayloadAction<uploadAFilePayload>) {
  const { file, fileFieldName, reduceObjKey } = data.payload;

  try {
    const config: UploadAPIConfigType = {
      fileDataURL: file,
      fileFieldName: 'file',
      isSecureRoute: true,
      method: 'POST',
      route: routes.user.uploadTeacherDoc,
      body: { documentType: fileFieldName },
    };

    const [uploadPromise, chan] = createUploader(config);
    yield fork(watchOnProgress, chan, reduceObjKey);
    const response = yield call(() => uploadPromise);
    if (response) {
      yield put(userActions.setUser(response));
      yield put(
        actions.setUploadProgress({
          objectKey: reduceObjKey,
          value: { uploading: false, progress: 0, newUploaded: true },
        }),
      );
    }
  } catch (error) {
    yield put(
      appActions.setAppAlert({
        severity: 'error',
        message: getErrorMessage(error),
      }),
    );

    yield put(
      actions.setUploadProgress({
        objectKey: reduceObjKey,
        value: { uploading: false, progress: 0, newUploaded: false },
      }),
    );
  }
}

function* deleteImportantDocument(data: PayloadAction<ImportantDocumentTypes>) {
  const documentType = data.payload;

  try {
    const updatedUser = yield call(apiCall, {
      method: 'DELETE',
      isSecureRoute: true,
      route: routes.user.deleteImportantDocument,
      body: { documentType },
    });
    if (updatedUser) {
      yield put(userActions.setUser(updatedUser));
    }
  } catch (error) {
    yield put(
      appActions.setAppAlert({
        severity: 'error',
        message: getErrorMessage(error),
      }),
    );
  }

  yield put(
    actions.setUploadProgress({
      objectKey: documentType,
      value: { uploading: false, progress: 0, newUploaded: false },
    }),
  );
}

export function* teacherProfileSaga() {
  yield takeLatest(actions.updateTeacherProfile.type, updateTeacherProfileSaga);
  yield takeLatest(actions.uploadAFile.type, uploadAFileSaga);
  yield takeLatest(actions.deleteAFile, deleteImportantDocument);
}
