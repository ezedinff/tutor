/**
 *
 * LogIn
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import * as Yup from 'yup';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectLogIn } from './selectors';
import { logInSaga } from './saga';
import { Box, Typography, useTheme, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Logo } from 'app/components/Logo';
import { LoadableButton } from 'app/components/LoadableButton';
import { device } from 'styles/devices';
import phoneNumberValidator from 'app/validators/phoneNumber.validator';
import { useFormik } from 'formik';
import PhoneInput from 'app/components/Shared/phoneInput.component';
import PasswordInput from 'app/components/Shared/PasswordInput.component';
import { actions } from './slice';

const validationSchema = Yup.object({
  internationalCode: Yup.string().required(),
  password: Yup.string().required('Password is required'),
  phoneNumber: Yup.string()
    .when('internationalCode', (internationalCode, schema) => {
      return schema.test({
        test: phoneNumber => {
          return phoneNumberValidator(`${internationalCode}${phoneNumber}`);
        },
        message: 'Enter a valid phone number',
      });
    })
    .required('Phone number is required'),
});

interface LoginFormObjType {
  internationalCode: string;
  phoneNumber: string;
  password: string;
}

const initialValues: LoginFormObjType = {
  internationalCode: '+251',
  phoneNumber: '',
  password: '',
};

interface Props {}

export function LogIn(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: logInSaga });
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const logIn = useSelector(selectLogIn);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const onLogInSubmit = (values: LoginFormObjType) => {
    const phoneNumber = `${values.internationalCode}${values.phoneNumber}`;
    const data = { phoneNumber, password: values.password };
    dispatch(actions.loginAction(data));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onLogInSubmit,
  });

  const { internationalCode } = formik.values;

  return (
    <>
      <Helmet>
        <title>LogIn</title>
        <meta name="description" content="Description of LogIn" />
      </Helmet>
      <Div style={{ background: theme.palette.background.default }}>
        <CenterContainer boxShadow={3}>
          <FormContainer m={10}>
            <Typography
              variant="h5"
              style={{ fontWeight: 'bold' }}
              color="primary"
            >
              Log In
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Welcome Back, Please fill your login info below.
            </Typography>

            <Box mt={3}>
              <form onSubmit={formik.handleSubmit}>
                <PhoneInput
                  codeError={formik.errors.internationalCode}
                  codeTouched={formik.touched.internationalCode}
                  phoneError={formik.errors.phoneNumber}
                  phoneTouched={formik.touched.phoneNumber}
                  restPhoneProps={{ ...formik.getFieldProps('phoneNumber') }}
                  restCodeProps={{
                    ...formik.getFieldProps('internationalCode'),
                  }}
                  role={'parent'}
                  internationalCode={internationalCode}
                />
                <PasswordInput
                  style={{ marginTop: theme.spacing(3) }}
                  fullWidth
                  placeholder="Your Password"
                  label="Password"
                  variant="outlined"
                  error={
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  {...formik.getFieldProps('password')}
                />
                <Button
                  size="small"
                  style={{ marginTop: theme.spacing(1) }}
                  color="primary"
                >
                  Forgot password ?
                </Button>
                <LoadableButton
                  type="submit"
                  loading={logIn.loggingIn}
                  style={{ marginTop: theme.spacing(3) }}
                  fullWidth
                  color="primary"
                  variant="contained"
                  disableElevation
                >
                  Sign In
                </LoadableButton>
              </form>
              <SignupText
                style={{ marginTop: theme.spacing(1) }}
                variant="subtitle2"
                color="textSecondary"
              >
                Don't have an account ?{' '}
                <Button component={Link} to="/signup" color="primary">
                  Sign Up
                </Button>
              </SignupText>
            </Box>
          </FormContainer>
          <GradientContainer
            style={{
              background: `linear-gradient(to bottom, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            }}
          >
            <Box
              display={'flex'}
              flex={1}
              justifyContent="center"
              alignItems="center"
            >
              <Logo
                flexDirection="column"
                paletteColor={theme.palette.background.paper}
              />
            </Box>
            <Box
              m={5}
              width={'70%'}
              style={{
                color: theme.palette.background.paper,
              }}
            >
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                Don't have an account ?
              </Typography>
              <Typography>
                Create a dade account and make your tutoring life easier. If you
                are either looking for a good tutor or you are a good tutor
                looking for a good side earning, you are at the right place{' '}
              </Typography>
              <Button
                variant="contained"
                disableElevation
                component={Link}
                to="/signup"
                style={{
                  background: theme.palette.background.paper,
                  color: theme.palette.primary.dark,
                  marginTop: theme.spacing(2),
                }}
              >
                Create Account
              </Button>
            </Box>
          </GradientContainer>
        </CenterContainer>
      </Div>
    </>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const CenterContainer = styled(Box)`
  display: flex;
  background: white;
  min-height: 65%;
  flex: 0.7;
  justify-content: space-between;
  ${device.laptopM} {
    flex: 0.85;
  }
  ${device.tabletL} {
    flex: 0.98;
  }
  ${device.tablet} {
    justify-content: center;
  }
  ${device.mobileL} {
    min-height: 100%;
    box-shadow: none !important;
  }
`;

const FormContainer = styled(Box)`
  flex-direction: column;
  justify-content: center;
  display: flex;
  flex: 0.35;
  ${device.tablet} {
    flex: 0.6;
    margin: 15px !important;
  }
  ${device.mobileL} {
    flex: 1;
    margin: 15px !important;
  }
`;

const GradientContainer = styled(Box)`
  display: flex;
  flex: 0.65;
  flex-direction: column;
  justify-content: space-between;
  ${device.tablet} {
    display: none;
  }
`;

const SignupText = styled(Typography)`
  display: none;
  ${device.tablet} {
    display: block;
  }
`;
