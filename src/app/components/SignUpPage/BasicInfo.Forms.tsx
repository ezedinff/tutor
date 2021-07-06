import {
  FormControl,
  FormHelperText,
  Grow,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { useFormik } from 'formik';
import React from 'react';
import { BasicInfoFormProps } from './types';
import { basicInfoSchema } from './validationSchemas';
import styled from 'styled-components';
import { AvatarChanger } from '../AvatarChanger';
import { FieldsContainer, QuestionContainer, QuestionPairs } from './styled';

export default (props: BasicInfoFormProps) => {
  const formik = useFormik({
    initialValues: props.initialValue,
    validationSchema: basicInfoSchema,
    onSubmit: props.onSubmit,
  });
  return (
    <Grow in>
      <form ref={props.formRef} onSubmit={formik.handleSubmit}>
        <FieldsContainer>
          <AvatarContainer>
            <AvatarChanger />
          </AvatarContainer>
          <QuestionPairs>
            <TextField
              className="question-pair-item"
              required
              error={
                formik.touched.firstName && formik.errors.firstName
                  ? true
                  : false
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="First Name"
              placeholder="Type your first name"
              variant="outlined"
              {...formik.getFieldProps('firstName')}
            />
            <TextField
              className="question-pair-item"
              error={
                formik.touched.middleName && formik.errors.middleName
                  ? true
                  : false
              }
              helperText={formik.touched.middleName && formik.errors.middleName}
              label="Middle Name"
              placeholder="Type your middle name"
              variant="outlined"
              {...formik.getFieldProps('middleName')}
            />
          </QuestionPairs>
          <QuestionPairs>
            <TextField
              className="question-pair-item"
              required
              error={
                formik.touched.lastName && formik.errors.lastName ? true : false
              }
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Last Name"
              placeholder="Type your last name"
              variant="outlined"
              {...formik.getFieldProps('lastName')}
            />

            <DatePicker
              className="question-pair-item"
              error={
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  ? true
                  : false
              }
              helperText={
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
              }
              name="dateOfBirth"
              label="Date Of Birth"
              format="MMM dd, yyyy"
              inputVariant="outlined"
              views={['year', 'month', 'date']}
              showTodayButton
              value={formik.values.dateOfBirth}
              onChange={d => formik.setFieldValue('dateOfBirth', d)}
            />
          </QuestionPairs>
          <QuestionContainer>
            <FormControl>
              <Select
                displayEmpty
                error={
                  formik.touched.gender && formik.errors.gender ? true : false
                }
                variant="outlined"
                {...formik.getFieldProps('gender')}
              >
                <MenuItem value="">
                  <em>Gender</em>
                </MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
              </Select>
              {formik.touched.gender && formik.errors.gender && (
                <FormHelperText error>{formik.errors.gender}</FormHelperText>
              )}
            </FormControl>
          </QuestionContainer>
          <QuestionContainer>
            <TextField
              required
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              placeholder="Type your email"
              variant="outlined"
              type="email"
              {...formik.getFieldProps('email')}
            />
          </QuestionContainer>
        </FieldsContainer>
      </form>
    </Grow>
  );
};

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;
