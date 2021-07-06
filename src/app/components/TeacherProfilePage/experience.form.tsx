import React from 'react';
import {
  Select,
  TextField,
  Typography,
  MenuItem,
  SelectProps,
  Divider,
  Collapse,
  Button,
  IconButton,
  TextFieldProps,
  FormHelperText,
} from '@material-ui/core';
import {
  QuestionContainer,
  OptionsContainer,
  OptionItem,
  SeparatorContainer,
  DividerText,
} from './styled';
import { Delete } from '@material-ui/icons';
import { referenceObjType } from './types';
import phoneNumberValidator from 'app/validators/phoneNumber.validator';

type fields = 'fullName' | 'email' | 'phoneNumber';

interface ExperienceProps {
  haveTutoringExperienceError?: string | false | undefined;
  haveTutoringExperieceProps?: SelectProps;
  haveTutoringExperience?: string;
  haveTutoringExperienceApproved?: Boolean;

  yearsSpentTutoringError: string | false | undefined;
  yearsSpentTutoringProps: TextFieldProps;
  yearsSpentTutoringApproved?: Boolean;

  referenceValues: referenceObjType[];
  setReferenceValues: (values: referenceObjType[]) => void;
}

const ExperienceInfo = (props: ExperienceProps) => {
  const referenceObj: referenceObjType = {
    fullName: '',
    email: undefined,
    phoneNumber: '',
    phoneError: false,
  };

  const handleReferenceValueChange = (
    index: number,
    value: string,
    field: fields,
  ) => {
    const currentValues = [...props.referenceValues];
    let phoneError = currentValues[index].phoneError;

    if (field === 'phoneNumber') {
      const isValidPhone = phoneNumberValidator(value);
      phoneError = isValidPhone ? false : true;
    }

    currentValues[index] = {
      ...currentValues[index],
      [field]: value,
      phoneError,
    };
    props.setReferenceValues(currentValues);
  };

  return (
    <QuestionContainer>
      <Typography variant="h6">
        3. Do you have prior tutoring experience ?
      </Typography>

      <OptionsContainer>
        <OptionItem
          fullWidth
          showExtraIcon
          approved={props.haveTutoringExperienceApproved}
        >
          <Select
            defaultValue=""
            variant="outlined"
            error={Boolean(props.haveTutoringExperienceError)}
            displayEmpty
            {...props.haveTutoringExperieceProps}
          >
            <MenuItem value="">
              <em>Tutoring experience</em>
            </MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
          <FormHelperText>{props.haveTutoringExperienceError}</FormHelperText>
        </OptionItem>

        <OptionItem
          fullWidth
          showExtraIcon
          approved={props.yearsSpentTutoringApproved}
        >
          <TextField
            disabled={props.haveTutoringExperience !== 'yes'}
            variant="outlined"
            label="Years spent tutoring"
            placeholder="Years spent tutoring"
            type="number"
            error={Boolean(props.yearsSpentTutoringError)}
            helperText={props.yearsSpentTutoringError}
            {...props.yearsSpentTutoringProps}
          />
        </OptionItem>
      </OptionsContainer>
      <Collapse in={props.haveTutoringExperience === 'yes'}>
        <SeparatorContainer>
          <Divider />
          <DividerText color="textSecondary" display="block" variant="caption">
            Fill the information for your reference
          </DividerText>
        </SeparatorContainer>
        {props.haveTutoringExperience === 'yes' &&
          props.referenceValues.map((obj, num) => (
            <OptionsContainer key={num}>
              <OptionItem fullWidth>
                <TextField
                  value={props.referenceValues[num].fullName}
                  onChange={e =>
                    handleReferenceValueChange(num, e.target.value, 'fullName')
                  }
                  required
                  variant="outlined"
                  label="Reference full name"
                  placeholder="Reference full name"
                />
              </OptionItem>

              <OptionItem fullWidth>
                <TextField
                  value={props.referenceValues[num].email}
                  onChange={e =>
                    handleReferenceValueChange(num, e.target.value, 'email')
                  }
                  variant="outlined"
                  label="Reference email"
                  placeholder="Reference email"
                  type="email"
                />
              </OptionItem>

              <OptionItem fullWidth>
                <TextField
                  value={props.referenceValues[num].phoneNumber}
                  onChange={e =>
                    handleReferenceValueChange(
                      num,
                      e.target.value,
                      'phoneNumber',
                    )
                  }
                  required
                  variant="outlined"
                  label="Phone number"
                  placeholder="Reference phone number"
                  error={props.referenceValues[num].phoneError}
                />
                {props.referenceValues[num].phoneError && (
                  <FormHelperText error>
                    Enter a valid phone number with county code
                  </FormHelperText>
                )}
              </OptionItem>

              {num > 0 && (
                <OptionItem>
                  <IconButton
                    onClick={() => {
                      const newArr = [...props.referenceValues];
                      newArr.pop();
                      props.setReferenceValues(newArr);
                    }}
                    color="secondary"
                  >
                    <Delete />
                  </IconButton>
                </OptionItem>
              )}
            </OptionsContainer>
          ))}
        <OptionItem>
          <Button
            onClick={() => {
              const newArr = [...props.referenceValues];
              newArr.push(referenceObj);
              props.setReferenceValues(newArr);
            }}
            color="primary"
            disabled={props.referenceValues.length >= 3}
          >
            Add More Reference
          </Button>
        </OptionItem>
      </Collapse>
    </QuestionContainer>
  );
};

export default ExperienceInfo;
