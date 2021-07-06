import React from 'react';
import styled from 'styled-components';
import {
  FormControl,
  Select,
  TextField,
  MenuItem,
  FormHelperText,
  InputAdornment,
  SelectProps,
  TextFieldProps,
} from '@material-ui/core';
import { supportedCountries } from 'app/constants';
import { RoleTypes } from 'types';

interface PropsTypes {
  internationalCode: string | undefined;
  codeError: string | undefined;
  codeTouched: boolean | undefined;
  phoneError: string | undefined;
  phoneTouched: boolean | undefined;
  restCodeProps: SelectProps;
  restPhoneProps: TextFieldProps;
  role: RoleTypes;
}

const PhoneInput = (props: PropsTypes) => {
  return (
    <PhoneNumberInputs>
      <FormControl style={{ textAlign: 'center', flex: 0.28 }}>
        <Select
          error={props.codeTouched && props.codeError ? true : false}
          defaultValue="+251"
          variant="outlined"
          {...props.restCodeProps}
        >
          {supportedCountries.map(country => (
            <MenuItem
              disabled={
                props.role === 'teacher' && country.shortCode !== 'ET'
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
        {props.codeTouched && props.codeError && (
          <FormHelperText error>{props.codeError}</FormHelperText>
        )}
      </FormControl>
      <TextField
        error={props.phoneTouched && props.phoneError ? true : false}
        helperText={props.phoneTouched && props.phoneError}
        label="Phone number"
        style={{ flex: 0.7 }}
        placeholder="Your phone number"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {props.internationalCode}
            </InputAdornment>
          ),
        }}
        {...props.restPhoneProps}
      />
    </PhoneNumberInputs>
  );
};

const PhoneNumberInputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;

const CountryItemContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex: 1;
  align-items: center;
`;

export default PhoneInput;
