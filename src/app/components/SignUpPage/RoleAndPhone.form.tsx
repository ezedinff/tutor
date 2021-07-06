import React, { useEffect } from 'react';
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Grow,
} from '@material-ui/core';
// import styled from 'styled-components';
import { useFormik } from 'formik';
import { RoleAndPhoneFormProps } from './types';
import { rolesAndPhoneSchema } from './validationSchemas';
import { QuestionContainer } from './styled';
import PhoneInput from '../Shared/phoneInput.component';

const RolesAndPhoneForm = (props: RoleAndPhoneFormProps) => {
  const formik = useFormik({
    validationSchema: rolesAndPhoneSchema,
    initialValues: props.initialValue,
    onSubmit: props.onSubmit,
  });

  const { internationalCode, role } = formik.values;

  // Set international code to ET for teachers
  useEffect(() => {
    if (role === 'teacher') {
      formik.setFieldValue('internationalCode', '+251');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <Grow in>
      <form ref={props.formRef} onSubmit={formik.handleSubmit}>
        <QuestionContainer>
          <Typography variant="h5">What will be your role ?</Typography>
          <FormControl>
            <Select
              error={formik.touched.role && formik.errors.role ? true : false}
              variant="outlined"
              style={{ width: '100%', marginTop: 30 }}
              displayEmpty
              {...formik.getFieldProps('role')}
            >
              <MenuItem value="">
                <em>Select Your Role</em>
              </MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
            {formik.touched.role && formik.errors.role && (
              <FormHelperText error>{formik.errors.role}</FormHelperText>
            )}
          </FormControl>
        </QuestionContainer>
        <QuestionContainer>
          <Typography variant="h5">What Is Your Phone Number?</Typography>
          <PhoneInput
            codeError={formik.errors.internationalCode}
            codeTouched={formik.touched.internationalCode}
            phoneError={formik.errors.phoneNumber}
            phoneTouched={formik.touched.phoneNumber}
            restPhoneProps={{ ...formik.getFieldProps('phoneNumber') }}
            restCodeProps={{ ...formik.getFieldProps('internationalCode') }}
            role={role}
            internationalCode={internationalCode}
          />
        </QuestionContainer>
        {/* <QuestionContainer>
          <Typography variant="h5">What Is Your Phone Number?</Typography>
          <PhoneNumberInputs>
            <FormControl style={{ textAlign: 'center', flex: 0.28 }}>
              <Select
                error={
                  formik.touched.internationalCode &&
                  formik.errors.internationalCode
                    ? true
                    : false
                }
                defaultValue="+251"
                variant="outlined"
                {...formik.getFieldProps('internationalCode')}
              >
                {supportedCountries.map(country => (
                  <MenuItem
                    disabled={
                      role === 'teacher' && country.shortCode !== 'ET'
                        ? true
                        : false
                    }
                    key={country.internationalNumber}
                    value={country.internationalNumber}
                  >
                    <CountryItemContainer>
                      {<country.flag style={{ height: 15, width: 30 }} />}
                      {country.shortCode}
                    </CountryItemContainer>
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.internationalCode &&
                formik.errors.internationalCode && (
                  <FormHelperText error>
                    {formik.errors.internationalCode}
                  </FormHelperText>
                )}
            </FormControl>
            <TextField
              error={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? true
                  : false
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              label="Phone number"
              style={{ flex: 0.7 }}
              placeholder="Type your phone number"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {internationalCode}
                  </InputAdornment>
                ),
              }}
              {...formik.getFieldProps('phoneNumber')}
            />
          </PhoneNumberInputs>
        </QuestionContainer> */}
      </form>
    </Grow>
  );
};

// const PhoneNumberInputs = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   margin-top: 30px;
// `;

// const CountryItemContainer = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   flex: 1;
//   align-items: center;
// `;

export default RolesAndPhoneForm;
