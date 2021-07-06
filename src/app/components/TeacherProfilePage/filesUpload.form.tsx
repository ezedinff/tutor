import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { FileUploadBox, OptionsContainer, QuestionContainer } from './styled';
import { CloudUpload } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import {
  ImportantDocumentTypes,
  TPuploadProgress,
} from 'app/containers/TeacherProfile/types';
import { actions as AppActions } from 'app/containers/AppMessages/slice';

interface Props {
  universityFileRoute?: String;
  universityFileAppoved?: Boolean;
  identificationRoute?: String;
  identityFileApproved?: Boolean;
  eslceRoute?: String;
  eslceApproved?: Boolean;

  academicDocUpload: TPuploadProgress;
  identificationUpload: TPuploadProgress;
  eslceUpload: TPuploadProgress;
  onDeleteFile: (docType: ImportantDocumentTypes) => void;
  onUploadDocument: (
    file: string,
    documentField: ImportantDocumentTypes,
  ) => void;
}

const FilesUpload = (props: Props) => {
  const [filesToUpload, setFilesToUpload] = useState({
    universityFile: '',
    identification: '',
    eslce: '',
  });
  const dispatch = useDispatch();
  // type FileTypes = 'universityFile' | 'identification' | 'eslce';

  const hanldleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: ImportantDocumentTypes,
  ) => {
    const files = e.target.files;
    const fileReader = new FileReader();
    if (files && files.length > 0) {
      if (files[0].size > 5e6) {
        dispatch(
          AppActions.setAppAlert({
            message: 'The maximum file size limit is 5MB.',
            severity: 'warning',
            autoHideIn: 5000,
          }),
        );
        return;
      }

      fileReader.readAsDataURL(files[0]);
      fileReader.onload = file => {
        const newObj = {
          ...filesToUpload,
          [fileType]: file.target && file.target.result?.toString(),
        };
        setFilesToUpload(newObj);
      };
    }
  };

  const handleOnDeleteFile = (documentType: ImportantDocumentTypes) => {
    // using the documentType as a key remove data URL on the state
    setFilesToUpload({ ...filesToUpload, [documentType]: '' });
    props.onDeleteFile(documentType);
  };

  const handleUploadCommand = (document: ImportantDocumentTypes) => {
    switch (document) {
      case 'universityFile':
        props.onUploadDocument(filesToUpload.universityFile, document);
        break;

      case 'eslce':
        props.onUploadDocument(filesToUpload.eslce, document);
        break;

      case 'identification':
        props.onUploadDocument(filesToUpload.identification, document);
        break;

      default:
        break;
    }
  };

  return (
    <QuestionContainer>
      <Typography variant="h6">
        6. Important files upload (Maximum 5MB)
      </Typography>

      <Typography variant="subtitle2" color="textSecondary">
        Click the buttons below and upload a scan of your document based on the
        requested file.
      </Typography>
      <Typography
        variant="subtitle2"
        style={{ fontWeight: 'bold' }}
        color="primary"
      >
        Note that your profile will not be visible if all three files aren't
        uploaded and approved.
      </Typography>
      <OptionsContainer my={2} justifyContent="space-between">
        <FileUploadBox
          name="University Document"
          value={filesToUpload.universityFile}
          imageRoute={props.universityFileRoute}
          onImageChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            hanldleFileChange(e, 'universityFile')
          }
          isApproved={props.universityFileAppoved}
          uploading={props.academicDocUpload?.uploading}
          newUploaded={props.academicDocUpload?.newUploaded}
          uploadProgress={props.academicDocUpload?.progress}
          onUpload={() => handleUploadCommand('universityFile')}
          onDeleteFile={() => handleOnDeleteFile('universityFile')}
        >
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            University Document
          </Typography>
          <CloudUpload color="primary" />
          <Typography variant="subtitle2" color="textPrimary">
            Degree, Masters or Last Semister Grade Report
          </Typography>
        </FileUploadBox>

        <FileUploadBox
          name="Identification"
          imageRoute={props.identificationRoute}
          value={filesToUpload.identification}
          onImageChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            hanldleFileChange(e, 'identification')
          }
          isApproved={props.identityFileApproved}
          uploading={props.identificationUpload?.uploading}
          newUploaded={props.identificationUpload?.newUploaded}
          uploadProgress={props.identificationUpload?.progress}
          onUpload={() => handleUploadCommand('identification')}
          onDeleteFile={() => handleOnDeleteFile('identification')}
        >
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            Identification
          </Typography>
          <CloudUpload color="primary" />
          <Typography variant="subtitle2" color="textPrimary">
            A Scan Of Your Ethiopian Identification Card
          </Typography>
        </FileUploadBox>

        <FileUploadBox
          name="ESLCE Report"
          value={filesToUpload.eslce}
          imageRoute={props.eslceRoute}
          onImageChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            hanldleFileChange(e, 'eslce')
          }
          isApproved={props.eslceApproved}
          uploading={props.eslceUpload?.uploading}
          newUploaded={props.eslceUpload?.newUploaded}
          uploadProgress={props.eslceUpload?.progress}
          onUpload={() => handleUploadCommand('eslce')}
          onDeleteFile={() => handleOnDeleteFile('eslce')}
        >
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            ESLCE Report
          </Typography>
          <CloudUpload color="primary" />
          <Typography variant="subtitle2" color="textPrimary">
            A Scan Of Your Ethiopian School Leaving Certificate Examination
            Report
          </Typography>
          {/* <LinearProgress style={{ width: '100%' }} /> */}
        </FileUploadBox>
      </OptionsContainer>
    </QuestionContainer>
  );
};

export default FilesUpload;
