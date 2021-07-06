import moment from 'moment';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grow,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { PhoneCodeFormProps } from './types';
import { phoneCodeSchema } from './validationSchemas';
import { QuestionContainer } from './styled';
import styled from 'styled-components';
import { getResendVerificationSMSState, zeroUp } from 'app/utils';
import { Check, Close, FiberManualRecord } from '@material-ui/icons';
import { StageType } from 'app/containers/SignUp/types';

const PhoneCodeForm = (props: PhoneCodeFormProps) => {
  const [codeValue, setCodeValue] = useState(props.initialValue.code);
  const [timeRemaining, setTimeRemaining] = useState(moment.duration(10));

  const formik = useFormik({
    initialValues: props.initialValue,
    validationSchema: phoneCodeSchema,
    onSubmit: props.onSubmit,
  });

  const getStageIcon = (stage: StageType) => {
    let stageIcon = (
      <FiberManualRecord
        style={{ marginRight: 20, width: 20 }}
        htmlColor={theme.palette.info.main}
      />
    );

    if (stage.inProgress) {
      stageIcon = <CircularProgress style={{ marginRight: 20 }} size={20} />;
    } else if (stage.success) {
      stageIcon = (
        <Check
          style={{ marginRight: 20, width: 20 }}
          htmlColor={theme.palette.success.main}
        />
      );
    } else if (stage.error) {
      stageIcon = (
        <Close
          style={{ marginRight: 20, width: 20 }}
          htmlColor={theme.palette.error.main}
        />
      );
    }

    return stageIcon;
  };

  const setCodeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    if (currentValue.length <= 6) {
      setCodeValue(currentValue);
      formik.setFieldValue('code', currentValue);
    }
  };

  const theme = useTheme();

  useEffect(() => {
    const { count, lastResent } = props.verificationSmsState;
    const { canResendAt } = getResendVerificationSMSState(lastResent, count);
    let difference = moment.duration(canResendAt.diff(moment(new Date())));

    const counter = setInterval(() => {
      difference = moment.duration(canResendAt.diff(moment(new Date())));
      setTimeRemaining(difference);
    }, 1000);

    return () => {
      clearInterval(counter);
    };
  }, [props.verificationSmsState]);

  return (
    <Grow in>
      <div>
        <form ref={props.formRef} onSubmit={formik.handleSubmit}>
          <QuestionContainer>
            <Typography variant="h5">Enter The Verification Code</Typography>
            <FormHelperText>
              A Verification SMS with a 6 digit code was sent to{' '}
              {props.rolesAndPhonValues.internationalCode}{' '}
              {props.rolesAndPhonValues.phoneNumber} .{' '}
            </FormHelperText>
            <FormControl>
              <TextField
                style={{ marginTop: theme.spacing(2) }}
                required
                error={formik.touched.code && formik.errors.code ? true : false}
                helperText={formik.touched.code && formik.errors.code}
                placeholder="Verification Code"
                variant="outlined"
                type="number"
                {...formik.getFieldProps('code')}
                onChange={setCodeInputValue}
                value={codeValue}
              />
            </FormControl>
          </QuestionContainer>
          <ResetItemsContainer>
            {timeRemaining.asMilliseconds() > 0 && (
              <Typography color="textSecondary" variant="subtitle2">
                Can Resend In{' '}
                <span style={{ color: theme.palette.primary.main }}>
                  {`${zeroUp(timeRemaining.hours())} : ${zeroUp(
                    timeRemaining.minutes(),
                  )} : ${zeroUp(timeRemaining.seconds())}`}
                </span>
              </Typography>
            )}
            <Button
              disabled={timeRemaining.asMilliseconds() > 0}
              onClick={props.onResendSms}
              color="primary"
              size="small"
              variant="text"
            >
              Resend SMS
            </Button>
          </ResetItemsContainer>
        </form>
        {props.finishInitiated && (
          <ProgressContainer>
            <ProgressText
              variant="subtitle1"
              color={
                props.signupFnishStage.code.inProgress
                  ? 'textSecondary'
                  : 'textPrimary'
              }
            >
              {getStageIcon(props.signupFnishStage.code)}
              Validating Verification Code
            </ProgressText>

            <ProgressText
              variant="subtitle1"
              color={
                props.signupFnishStage.account.inProgress
                  ? 'textSecondary'
                  : 'textPrimary'
              }
            >
              {getStageIcon(props.signupFnishStage.account)}
              Creating Account
            </ProgressText>
          </ProgressContainer>
        )}
      </div>
    </Grow>
  );
};

const ResetItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const ProgressText = styled(Typography)`
  display: flex;
  margin-top: 10px;
`;
export default PhoneCodeForm;
