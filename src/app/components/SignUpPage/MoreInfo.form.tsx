import { Grow, TextField, useTheme } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import PasswordInput from '../Shared/PasswordInput.component';
import { QuestionContainer, QuestionPairs } from './styled';
import { MoreInfoFormProps } from './types';
import { getMoreInfoSchema } from './validationSchemas';

const MoreInfoForm = (props: MoreInfoFormProps) => {
  const theme = useTheme();

  const moreInfoValidatorSchema = getMoreInfoSchema(
    props.rolesAndPhonValues?.role,
  );

  const formik = useFormik({
    validationSchema: moreInfoValidatorSchema,
    initialValues: props.initialValue,
    onSubmit: props.onSubmit,
  });

  return (
    <Grow in>
      <form ref={props.formRef} onSubmit={formik.handleSubmit}>
        <QuestionContainer>
          <PasswordInput
            variant="outlined"
            label="Password"
            placeholder="Type a password"
            error={
              formik.touched.password && formik.errors.password ? true : false
            }
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
          />
        </QuestionContainer>
        <QuestionContainer>
          <PasswordInput
            variant="outlined"
            label="Confirm password"
            placeholder="Confirm your password"
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? true
                : false
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            {...formik.getFieldProps('confirmPassword')}
          />
        </QuestionContainer>

        {props.rolesAndPhonValues.role === 'teacher' && (
          <QuestionPairs>
            <TextField
              variant="outlined"
              label="Price Ethiopia"
              placeholder="Price Per Hour In Ethiopia (Birr)"
              type="number"
              error={
                formik.touched.pricePerHourEth && formik.errors.pricePerHourEth
                  ? true
                  : false
              }
              helperText={
                formik.touched.pricePerHourEth && formik.errors.pricePerHourEth
              }
              {...formik.getFieldProps('pricePerHourEth')}
            />
            <TextField
              style={{ marginLeft: theme.spacing(1) }}
              variant="outlined"
              label="International Price"
              placeholder="Price Per Hour Outside Ethiopia (Birr)"
              type="number"
              error={
                formik.touched.pricePerHourInt && formik.errors.pricePerHourInt
                  ? true
                  : false
              }
              helperText={
                formik.touched.pricePerHourInt && formik.errors.pricePerHourInt
              }
              {...formik.getFieldProps('pricePerHourInt')}
            />
          </QuestionPairs>
        )}
      </form>
    </Grow>
  );
};

export default MoreInfoForm;
