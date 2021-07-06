import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import {
  ContainerState,
  ImportantDocumentTypes,
  IProfileValuesOnly,
  SetUploadProgressPayload,
  uploadAFilePayload,
} from './types';

// The initial state of the TeacherProfile container

const initialUploadProgress = {
  uploading: false,
  progress: 0,
  newUploaded: false,
};

export const initialState: ContainerState = {
  savingProfile: false,
  universityFile: initialUploadProgress,
  identification: initialUploadProgress,
  eslce: initialUploadProgress,
};

const teacherProfileSlice = createSlice({
  name: 'teacherProfile',
  initialState,
  reducers: {
    updateTeacherProfile(state, action: PayloadAction<IProfileValuesOnly>) {
      state.savingProfile = true;
    },
    setSavingProfile(state, action: PayloadAction<boolean>) {
      state.savingProfile = action.payload;
    },

    setUploadProgress(state, action: PayloadAction<SetUploadProgressPayload>) {
      state[action.payload?.objectKey] = action.payload?.value;
    },

    uploadAFile(state, action: PayloadAction<uploadAFilePayload>) {
      state[action.payload?.reduceObjKey] = {
        uploading: true,
        progress: 0,
        newUploaded: false,
      };
    },

    deleteAFile(state, action: PayloadAction<ImportantDocumentTypes>) {
      state[action.payload] = {
        uploading: true,
        progress: 0,
        newUploaded: false,
      };
    },
  },
});

export const { actions, reducer, name: sliceKey } = teacherProfileSlice;
