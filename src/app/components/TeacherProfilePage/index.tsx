/**
 *
 * TeacherProfile
 *
 */
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { CircularProgress, Fab, Theme } from '@material-ui/core';
import CollegeInfo from './collegeInfo.form';
import ExperienceInfo from './experience.form';
import HighSchoolInfo from './highSchoolInfo.form';
import Preferences from './preferences.form';
import MoreInfo from './moreInfo.form';
import { teacherProfileValidationSchema } from './validationSchemas';
import {
  ImportantDocumentTypes,
  IProfileValuesOnly,
  ITeacherProfile,
  TPuploadProgress,
} from 'app/containers/TeacherProfile/types';
import { useFormik } from 'formik';
import { Save } from '@material-ui/icons';
import { referenceObjType } from './types';
import FilesUpload from './filesUpload.form';
import { getCoordinateObject } from 'app/utils';
import { ILocation } from '../Map';

// interface MultiSelectorValueType { name: String, value: String };

const prepareProfileValuesForForm = (valuesFromBack: ITeacherProfile) => {
  const valuesOnlyObj: IProfileValuesOnly = {
    universityOrCollege: valuesFromBack.universityOrCollege?.value,
    startYear: valuesFromBack.startYear?.value,
    endYear: valuesFromBack.endYear?.value,
    studyLevel: valuesFromBack.studyLevel?.value,
    gpa: valuesFromBack.gpa?.value,
    major: valuesFromBack.major?.value,

    eslceScore: valuesFromBack.eslceScore?.value,
    highSchoolName: valuesFromBack.highSchoolName?.value,
    satScore: valuesFromBack.satScore?.value,
    ieltsScore: valuesFromBack.ieltsScore?.value,
    toeflScore: valuesFromBack.toeflScore?.value,

    haveTutoringExperience: valuesFromBack.haveTutoringExperience?.value,

    yearsSpentTutoring: valuesFromBack.yearsSpentTutoring?.value,

    tutoringEnvironment: valuesFromBack.tutoringEnvironment,
    willTeachKgToFive: valuesFromBack.willTeachKgToFive,
    willTeacSixToEight: valuesFromBack.willTeacSixToEight,
    willTeachNineToTwelve: valuesFromBack.willTeachNineToTwelve,

    ableLanguages: valuesFromBack.ableLanguages?.map(lang => ({
      label: lang.label,
      value: lang.value,
    })),
    extraSkills: valuesFromBack.extraSkills?.map(skill => ({
      label: skill.label,
      value: skill.value,
    })),
    interestedSubjects: valuesFromBack.interestedSubjects,
    aboutTeacher: valuesFromBack.aboutTeacher,
    address: getCoordinateObject(valuesFromBack.address?.coordinates),
    addressString: valuesFromBack.addressString,

    experienceReferences: valuesFromBack.experienceReferences?.map(exp => ({
      ...exp,
      phoneError: false,
    })),
  };

  return valuesOnlyObj;
};

interface Props {
  valuesFromBackend: ITeacherProfile;
  onSaveProfile: (values: IProfileValuesOnly) => void;
  savingProfile: boolean;
  academicDocUpload: TPuploadProgress;
  identificationUpload: TPuploadProgress;
  eslceUpload: TPuploadProgress;
  onDeleteFile: (docType: ImportantDocumentTypes) => void;
  onUploadDocument: (
    file: string,
    documentField: ImportantDocumentTypes,
  ) => void;
}

export function TeacherProfile(props: Props) {
  const referenceObj: referenceObjType = {
    fullName: '',
    email: undefined,
    phoneNumber: '',
    phoneError: false,
  };

  const setNumberOfReferences = (values: referenceObjType[]) => {
    formik.setFieldValue('experienceReferences', values);
    if (values) {
      let errorFound = false;

      values.forEach(value => {
        if (value.phoneError) {
          // formik.setErrors({
          //   experienceReferences: 'Enter valid phone number',
          // });
          errorFound = true;
        }
      });
      if (errorFound) {
        formik.errors.experienceReferences =
          'An invalid phone number was entered';
      } else {
        formik.errors.experienceReferences &&
          delete formik.errors.experienceReferences;
      }
    }
  };

  const formik = useFormik({
    initialValues: prepareProfileValuesForForm(props.valuesFromBackend),
    validationSchema: teacherProfileValidationSchema,
    onSubmit: c => props.onSaveProfile(c),
  });

  const now = new Date();
  const yearAddedFour = now.getFullYear() + 4;
  const afterFourYears = new Date(yearAddedFour, now.getMonth(), now.getDate());

  const [savingOverride, setSavingOverride] = useState(false);

  return (
    <Div>
      <form onSubmit={formik.handleSubmit}>
        <CollegeInfo
          universityOrCollageError={
            formik.touched.universityOrCollege &&
            formik.errors.universityOrCollege
          }
          universityOrCollageProps={{
            ...formik.getFieldProps('universityOrCollege'),
          }}
          universityApproved={
            props.valuesFromBackend?.universityOrCollege?.approved
          }
          startYearError={formik.touched.startYear && formik.errors.startYear}
          startYearValue={formik.values.startYear || new Date()}
          setStartYearValue={d => formik.setFieldValue('startYear', d)}
          startYearApproved={props.valuesFromBackend?.startYear?.approved}
          endYearError={formik.touched.endYear && formik.errors.endYear}
          endYearValue={formik.values.endYear || afterFourYears}
          setEndYearValue={d => formik.setFieldValue('endYear', d)}
          endYearApproved={props.valuesFromBackend?.endYear?.approved}
          studyLevelError={
            formik.touched.studyLevel && formik.errors.studyLevel
          }
          studyLevelProps={{
            ...formik.getFieldProps('studyLevel'),
          }}
          studyLevelApproved={props.valuesFromBackend?.studyLevel?.approved}
          majorError={formik.touched.major && formik.errors.major}
          majorProps={{
            ...formik.getFieldProps('major'),
          }}
          majorApproved={props.valuesFromBackend?.major?.approved}
          gpaError={formik.touched.gpa && formik.errors.gpa}
          gpaProps={{
            ...formik.getFieldProps('gpa'),
          }}
          gpaApproved={props.valuesFromBackend?.gpa?.approved}
        />
        <HighSchoolInfo
          eslceScoreError={
            formik.touched.eslceScore && formik.errors.eslceScore
          }
          eslceScoreProps={{
            ...formik.getFieldProps('eslceScore'),
          }}
          eslceApproved={props.valuesFromBackend?.eslceScore?.approved}
          highSchoolNameError={
            formik.touched.highSchoolName && formik.errors.highSchoolName
          }
          highSchoolNameProps={{
            ...formik.getFieldProps('highSchoolName'),
          }}
          highSchholNameApproved={
            props.valuesFromBackend?.highSchoolName?.approved
          }
          satScoreError={formik.touched.satScore && formik.errors.satScore}
          satScoreProps={{
            ...formik.getFieldProps('satScore'),
          }}
          satScoreApproved={props.valuesFromBackend?.satScore?.approved}
          ieltsScoreError={
            formik.touched.ieltsScore && formik.errors.ieltsScore
          }
          ieltsScoreApproved={props.valuesFromBackend?.ieltsScore?.approved}
          ieltsScoreProps={{
            ...formik.getFieldProps('ieltsScore'),
          }}
          toeflScoreError={
            formik.touched.toeflScore && formik.errors.toeflScore
          }
          toeflScoreProps={{
            ...formik.getFieldProps('toeflScore'),
          }}
          toeflScoreApproved={props.valuesFromBackend?.toeflScore?.approved}
        />
        <ExperienceInfo
          haveTutoringExperienceError={
            formik.touched.haveTutoringExperience &&
            formik.errors.haveTutoringExperience
          }
          haveTutoringExperieceProps={{
            ...formik.getFieldProps('haveTutoringExperience'),
          }}
          haveTutoringExperience={formik.values.haveTutoringExperience}
          haveTutoringExperienceApproved={
            props.valuesFromBackend?.haveTutoringExperience?.approved
          }
          yearsSpentTutoringError={
            formik.touched.yearsSpentTutoring &&
            formik.errors.yearsSpentTutoring
          }
          yearsSpentTutoringProps={{
            ...formik.getFieldProps('yearsSpentTutoring'),
          }}
          yearsSpentTutoringApproved={
            props.valuesFromBackend?.yearsSpentTutoring?.approved
          }
          referenceValues={
            Array.isArray(formik.values?.experienceReferences) &&
            formik.values?.experienceReferences?.length > 0
              ? formik.values?.experienceReferences
              : [referenceObj]
          }
          setReferenceValues={setNumberOfReferences}
        />

        <Preferences
          tutoringEnvironmentError={
            formik.touched.tutoringEnvironment &&
            formik.errors.tutoringEnvironment
          }
          tutoringEnvironmentProps={{
            ...formik.getFieldProps('tutoringEnvironment'),
          }}
          willTeacSixToEightProps={{
            ...formik.getFieldProps('willTeacSixToEight'),
          }}
          willTeachKgToFiveProps={{
            ...formik.getFieldProps('willTeachKgToFive'),
          }}
          willTeachNineToTwelveProps={{
            ...formik.getFieldProps('willTeachNineToTwelve'),
          }}
        />
        <MoreInfo
          ableLanguagesValues={formik.values.ableLanguages}
          onAbleLanguagesChange={v => formik.setFieldValue('ableLanguages', v)}
          extraSkillValus={formik.values.extraSkills}
          onExtraSkillChange={v => formik.setFieldValue('extraSkills', v)}
          interestedSubjectsValues={formik.values.interestedSubjects}
          onInterstedSubjectsChange={v =>
            formik.setFieldValue('interestedSubjects', v)
          }
          aboutTeacherError={
            formik.touched.aboutTeacher && formik.errors.aboutTeacher
          }
          aboutTeacherProps={{
            ...formik.getFieldProps('aboutTeacher'),
          }}
          aboutTeacherValue={formik.values.aboutTeacher}
          address={formik.values.address}
          addressString={formik.values.addressString}
          setAddress={(loc: ILocation) => formik.setFieldValue('address', loc)}
          setAddressString={(str: string) =>
            formik.setFieldValue('addressString', str)
          }
          setSavingOverride={setSavingOverride}
          submitForm={formik.handleSubmit}
        />

        <FilesUpload
          identificationRoute={
            props.valuesFromBackend?.identification?.fileName
          }
          identityFileApproved={
            props.valuesFromBackend?.identification?.approved
          }
          universityFileRoute={
            props.valuesFromBackend?.universityFile?.fileName
          }
          universityFileAppoved={
            props.valuesFromBackend?.universityFile?.approved
          }
          eslceRoute={props.valuesFromBackend?.eslce?.fileName}
          eslceApproved={props.valuesFromBackend?.eslce?.approved}
          academicDocUpload={props.academicDocUpload}
          identificationUpload={props.identificationUpload}
          eslceUpload={props.eslceUpload}
          onUploadDocument={props.onUploadDocument}
          onDeleteFile={props.onDeleteFile}
        />
        {/* <Box my={3}>
          <LoadableButton
            disableElevation
            style={{ minWidth: 200 }}
            loading={props.savingProfile}
            color="primary"
            variant="contained"
            type="submit"
          >
            Save Information
          </LoadableButton>
        </Box> */}

        <Fab
          type="submit"
          style={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            zIndex: 10,
          }}
          color="primary"
          disabled={props.savingProfile || savingOverride}
          title="Save Changes"
        >
          <Save />
          {props.savingProfile && (
            <CircularProgress
              size={68}
              style={{ position: 'absolute', top: -6, left: -6, zIndex: 1 }}
            />
          )}
        </Fab>
      </form>
    </Div>
  );
}

const Div = styled.div`
  ${({ theme }: { theme: Theme }) => `
    padding-bottom: ${theme.spacing(3)}px; 
  `}
`;
