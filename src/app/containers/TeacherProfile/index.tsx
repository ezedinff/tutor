/**
 *
 * TeacherProfile
 *
 */

import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
// import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { selectTeacherProfile } from './selectors';
import { teacherProfileSaga } from './saga';
import { Box, Container, Typography, useTheme } from '@material-ui/core';
import { TeacherProfile as TeacherProfilePage } from 'app/components/TeacherProfilePage';
import { selectUser } from '../UserLayout/selectors';
import { ImportantDocumentTypes, IProfileValuesOnly } from './types';
import ConfirmModal from 'app/components/Modals/confirm.modal';

interface Props {}

const documenTypeNameMapper = {
  identification: 'Identification',
  eslce: 'E.S.L.C.E',
  universityFile: 'University',
};

export const TeacherProfile = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: teacherProfileSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const teacherProfile = useSelector(selectTeacherProfile);
  const user = useSelector(selectUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const theme = useTheme();

  const [deleteFile, setDeleteFile] = useState<ImportantDocumentTypes | null>(
    null,
  );

  const onSaveProfile = (values: IProfileValuesOnly) => {
    dispatch(actions.updateTeacherProfile(values));
  };

  const showDeleteConfirm = (documentType: ImportantDocumentTypes) => {
    setDeleteFile(documentType);
  };

  const onUploadDocument = (
    file: string,
    documentField: ImportantDocumentTypes,
  ) => {
    dispatch(
      actions.uploadAFile({
        file,
        reduceObjKey: documentField,
        fileFieldName: documentField,
      }),
    );
  };

  const onDeleteImportantDocument = () => {
    if (deleteFile) {
      dispatch(actions.deleteAFile(deleteFile));
    }
    setDeleteFile(null);
  };

  return (
    <>
      <Helmet>
        <title>Teacher Profile</title>
        <meta name="description" content="Description of TeacherProfile" />
      </Helmet>
      <ConfirmModal
        title="Delete Document"
        contentText={`Are you sure you want to delete your ${
          deleteFile && documenTypeNameMapper[deleteFile]
        } document ?`}
        open={Boolean(deleteFile)}
        confirmText="Yes"
        cancelText="No"
        deleteAction
        onClose={() => {
          setDeleteFile(null);
        }}
        onConfirm={onDeleteImportantDocument}
      />

      <Container maxWidth="xl">
        {/* <div style={{ height: '200px', width: '100%', background: 'green' }}>
          <div
            style={{ height: '200px', width: '600px', background: 'green' }}
          />
        </div> */}
        <Box
          style={{
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* <BusinessCenter color="primary" style={{ fontSize: 40 }} /> */}
          <Typography style={{ fontWeight: 'bold' }} variant="h5">
            Your Teaching Profile
          </Typography>
        </Box>

        <TeacherProfilePage
          valuesFromBackend={
            user
              ? user
              : { haveTutoringExperience: { value: '', approved: false } }
          }
          savingProfile={teacherProfile.savingProfile}
          onSaveProfile={onSaveProfile}
          academicDocUpload={teacherProfile.universityFile}
          identificationUpload={teacherProfile.identification}
          eslceUpload={teacherProfile.eslce}
          onUploadDocument={onUploadDocument}
          onDeleteFile={showDeleteConfirm}
        />
      </Container>
    </>
  );
});

// const MainContainer = styled.div`
//   height: calc(100% - 80px);
//   background: red;
// `;

// const QuestionContainer = styled(Box)`
//   padding: 10px;
//   max-width: calc(100% - 80px);
// `;

// const OptionsContainer = styled(Box)`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;

//   @media only screen and (max-width: 1365px) {
//     justify-content: space-between;
//   }
// `;
