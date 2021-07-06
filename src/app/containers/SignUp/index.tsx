/**
 *
 * SignUp
 *
 */

import React, {
  useRef,
  useState,
  RefObject,
  ReactChild,
  useEffect,
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  Box,
} from '@material-ui/core';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { selectSignUp } from './selectors';
import { signUpSaga } from './saga';
import { Logo } from 'app/components/Logo/Loadable';
import { borderRadius } from 'styles/constants';
import BulletListItem from 'app/components/BulletListItem';
import { device } from 'styles/devices';
import RolesAndPhoneForm from 'app/components/SignUpPage/RoleAndPhone.form';
import useLocalStorage from 'utils/hooks/useLocalStorage';
import { initialValues, signupStorageNames } from './constants';
import BasicInfoForms from 'app/components/SignUpPage/BasicInfo.Forms';
import {
  BasicInfoFormObject,
  MoreInfoFormObject,
  PhoneCodeFormObject,
  RoleAndPhoneFormObject,
} from './types';
import MoreInfoForm from 'app/components/SignUpPage/MoreInfo.form';
import { firebaseAuth } from 'utils/firebase';
import ConfirmModal from 'app/components/Modals/confirm.modal';
import { LoadableButton } from 'app/components/LoadableButton';
import PhoneCodeForm from 'app/components/SignUpPage/PhoneCode.Form';
import { isJson } from 'app/utils';
import { VerificationSmsStateType } from './types';

interface Props {}

interface signupFormElement {
  component: ReactChild;
  ref: RefObject<HTMLFormElement>;
}

const getSignUpSteps = () => ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

export function SignUp(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: signUpSaga });
  // const [currentFormIndex, setCurrentFormIndex] = useState<number>(0);
  const [showConfirmPhoneModal, setShowConfirmPhoneModal] = useState<boolean>(
    false,
  );

  const [rolesAndPhoneStored, setRolesAndPhoneStore] = useLocalStorage(
    'rolesAndPhoneValues',
    initialValues.rolesAndPhone,
  );
  const fullPhoneNumber = `${rolesAndPhoneStored.internationalCode}${rolesAndPhoneStored.phoneNumber}`;

  const [phoneCodeState, setPhoneCodeState] = useState(initialValues.phoneCode);
  const [basicInfoStored, setBasicInfoStore] = useLocalStorage(
    'basicInfoValues',
    initialValues.basicInfo,
  );
  const [moreInfoStored, setMoreInfoStore] = useLocalStorage(
    'moreInfoValues',
    initialValues.moreInfo,
  );

  const signupFormRef = useRef<HTMLDivElement>(null);

  const roleAndPhoneFormRef = useRef<HTMLFormElement>(null);
  const phoneCodeFormRef = useRef<HTMLFormElement>(null);
  const basicInfoFormRef = useRef<HTMLFormElement>(null);
  const moreInfoFormRef = useRef<HTMLFormElement>(null);

  const steps: string[] = getSignUpSteps();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signUp = useSelector(selectSignUp);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { currentFormIndex } = signUp;

  const theme = useTheme();

  // Dispatch action to change the index of the form
  const setCurrentFormIndex = (index: number) => {
    dispatch(actions.setCurrentSignupFormIndex(index));
  };

  const showNextForm = () => {
    if (currentFormIndex + 1 < signUpForms.length) {
      setCurrentFormIndex(currentFormIndex + 1);
    }
  };

  const showPreviousForm = () => {
    if (currentFormIndex - 1 >= 0) {
      setCurrentFormIndex(currentFormIndex - 1);
    }
  };

  const onRolesAndPhoneSubmit = (values: RoleAndPhoneFormObject) => {
    setRolesAndPhoneStore(values);
    showNextForm();
  };

  const onPhoneCodeSubmit = (values: PhoneCodeFormObject) => {
    setPhoneCodeState(values);
    dispatch(
      actions.verifyAndFinishSignup({
        code: values.code,
        phoneNumber: fullPhoneNumber,
        role: rolesAndPhoneStored.role,
        ...moreInfoStored,
        ...basicInfoStored,
      }),
    );
  };

  const onBasicInfoSubmit = (values: BasicInfoFormObject) => {
    setBasicInfoStore(values);
    showNextForm();
  };

  const onMoreInfoFormSubmit = (values: MoreInfoFormObject) => {
    setMoreInfoStore(values);
    tooglePhoneConfirmModal();
  };

  const phoneConfirmText = (
    <Typography>
      We will send a 6 digit verification code to the phone number
      <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
        {` ${fullPhoneNumber} `}
      </span>
      . Do you want to continue ?
    </Typography>
  );

  const tooglePhoneConfirmModal = () =>
    setShowConfirmPhoneModal(!showConfirmPhoneModal);

  const onPhoneConfirm = () => {
    tooglePhoneConfirmModal();
    dispatch(actions.sendVerificationSMS({ phoneNumber: fullPhoneNumber }));
  };

  const signUpForms: signupFormElement[] = [
    {
      component: (
        <RolesAndPhoneForm
          formRef={roleAndPhoneFormRef}
          onSubmit={onRolesAndPhoneSubmit}
          initialValue={rolesAndPhoneStored}
        />
      ),
      ref: roleAndPhoneFormRef,
    },
    {
      component: (
        <BasicInfoForms
          rolesAndPhonValues={rolesAndPhoneStored}
          formRef={basicInfoFormRef}
          onSubmit={onBasicInfoSubmit}
          initialValue={basicInfoStored}
        />
      ),
      ref: basicInfoFormRef,
    },
    {
      component: (
        <MoreInfoForm
          rolesAndPhonValues={rolesAndPhoneStored}
          basicInfoValues={basicInfoStored}
          formRef={moreInfoFormRef}
          initialValue={moreInfoStored}
          onSubmit={onMoreInfoFormSubmit}
        />
      ),
      ref: moreInfoFormRef,
    },
    {
      component: (
        <PhoneCodeForm
          rolesAndPhonValues={rolesAndPhoneStored}
          initialValue={phoneCodeState}
          formRef={phoneCodeFormRef}
          verificationSmsState={signUp.verificationSms}
          finishInitiated={signUp.finishInitiated}
          signupFnishStage={signUp.finishSignupStage}
          onResendSms={tooglePhoneConfirmModal}
          onSubmit={onPhoneCodeSubmit}
        />
      ),
      ref: phoneCodeFormRef,
    },
  ];

  const submitCurrentForm = () => {
    if (currentFormIndex < signUpForms.length) {
      signUpForms[currentFormIndex].ref.current?.dispatchEvent(
        new Event('submit', { cancelable: true }),
      );
    }
  };

  useEffect(() => {
    // Add recaptcha verifier for signup
    window.recaptchaVerifier = new firebaseAuth.RecaptchaVerifier(
      signupFormRef.current,
      {
        size: 'invisible',
        // callback: (response) => {
        // },
      },
    );

    window.recaptchaVerifier?.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

    // window.recaptchaVerifier?.verify();

    // Sync current form index from localStorage
    const currentStoredIndex = parseInt(
      localStorage.getItem(signupStorageNames.formIndex) || '0',
    );
    dispatch(actions.setCurrentSignupFormIndex(currentStoredIndex));

    // hydrate verificationSmsState from local storage
    const currentStoredVerificationSmsState = localStorage.getItem(
      signupStorageNames.verificationSms,
    );
    if (
      typeof currentStoredVerificationSmsState === 'string' &&
      isJson(currentStoredVerificationSmsState)
    ) {
      const parsedState: VerificationSmsStateType = JSON.parse(
        currentStoredVerificationSmsState,
      );
      dispatch(actions.setVericationSms(parsedState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Syncup index with local storage
    const currentStoredIndex = parseInt(
      localStorage.getItem(signupStorageNames.formIndex) || '0',
    );

    if (currentStoredIndex !== signUp.currentFormIndex) {
      localStorage.setItem(
        signupStorageNames.formIndex,
        `${signUp.currentFormIndex}`,
      );
    }
  }, [signUp.currentFormIndex]);

  return (
    <>
      <ConfirmModal
        open={showConfirmPhoneModal}
        title="Send Verification SMS ?"
        contentText={phoneConfirmText}
        onClose={tooglePhoneConfirmModal}
        onConfirm={onPhoneConfirm}
      />
      <Helmet>
        <title>SignUp</title>
        <meta name="description" content="Signup for dade tutors" />
      </Helmet>
      <Div>
        <div ref={signupFormRef} />
        <Description>
          <Logo />
          <BulletListItem />
          <BulletListItem />
          <BulletListItem />
        </Description>
        <SignUpBox boxShadow={2}>
          <div>
            <Typography
              color="primary"
              variant="h3"
              style={{ fontWeight: 500 }}
            >
              Sign Up
            </Typography>
            <Typography
              style={{ marginTop: 10 }}
              color="textSecondary"
              variant="body2"
            >
              Choose the role you want to have on Dade platform and fill out
              your information.
            </Typography>
            <Stepper alternativeLabel activeStep={currentFormIndex}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          {signUpForms[currentFormIndex].component}
          <div
            style={{
              height: 80,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <ActionButtonsContainer>
              <Button
                style={{ flex: 0.45 }}
                // startIcon={<ArrowBack />}
                onClick={showPreviousForm}
                color="primary"
                variant="outlined"
                disableElevation
                disabled={currentFormIndex <= 0}
              >
                Back
              </Button>
              <LoadableButton
                disableElevation
                style={{ flex: 0.45 }}
                color="primary"
                variant="contained"
                loading={
                  signUp.submitInProgress &&
                  currentFormIndex < signUpForms.length - 1
                }
                disabled={signUp.submitInProgress}
                onClick={submitCurrentForm}
              >
                {currentFormIndex === signUpForms.length - 1
                  ? 'Finish'
                  : 'Next'}
              </LoadableButton>
            </ActionButtonsContainer>
            <Typography variant="caption" color="textSecondary">
              By clicking next you agree to the terms and conditions of Dade
              Tutors
            </Typography>
          </div>
        </SignUpBox>
      </Div>
    </>
  );
}

const Div = styled.div`
  display: flex;
  flex: 1;
  min-height: 100%;
  min-width: 100%;
  justify-content: space-evenly;
  position: absolute;
  flex-direction: row;
  padding: 30px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  max-width: 100%;
  justify-content: center;
  ${device.tablet} {
    display: none;
  }
`;

const SignUpBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 500px;
  max-width: 100%;
  text-align: center;
  justify-content: space-between;
  background: #ffffff;
  border-radius: ${borderRadius};
  padding: 20px;

  ${device.tablet} {
    min-height: calc(100% - 60px);
    position: absolute;
  }

  ${device.mobileL} {
    box-shadow: none !important;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
