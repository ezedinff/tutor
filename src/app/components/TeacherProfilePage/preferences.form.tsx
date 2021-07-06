import {
  CheckboxProps,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  SelectProps,
  Typography,
  useTheme,
} from '@material-ui/core';
// import { CheckBox } from '@material-ui/icons';
import React from 'react';

import {
  OptionsContainer,
  QuestionContainer,
  OptionItem,
  SeparatorContainer,
} from './styled';

interface PreferencesProps {
  tutoringEnvironmentError: string | undefined | false;
  tutoringEnvironmentProps: SelectProps;

  willTeachKgToFiveProps: CheckboxProps;
  willTeacSixToEightProps: CheckboxProps;
  willTeachNineToTwelveProps: CheckboxProps;
}

const Preferences = (props: PreferencesProps) => {
  const theme = useTheme();

  return (
    <QuestionContainer>
      <Typography variant="h6">4. Your tutoring preferences</Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Tell us about the way you prefer to tutor students.
      </Typography>
      <OptionsContainer>
        <OptionItem fullWidth>
          <Select
            error={Boolean(props.tutoringEnvironmentError)}
            defaultValue=""
            variant="outlined"
            displayEmpty
            {...props.tutoringEnvironmentProps}
          >
            <MenuItem value="">
              <em>Tutoring Environment</em>
            </MenuItem>
            <MenuItem value="online">Online only</MenuItem>
            <MenuItem value="inperson">In person only</MenuItem>
            <MenuItem value="both">Both online & in Person</MenuItem>
          </Select>
          <FormHelperText>{props.tutoringEnvironmentError}</FormHelperText>
        </OptionItem>
      </OptionsContainer>

      <SeparatorContainer>
        <Divider />
      </SeparatorContainer>

      <OptionsContainer>
        <OptionItem>
          <FormControl component="fieldset">
            <FormLabel>Preferred Student Study Level</FormLabel>
            <FormGroup>
              <FormControlLabel
                style={{ margin: theme.spacing(1) }}
                label="KG - Grade 5"
                control={
                  <Checkbox
                    style={{ marginRight: theme.spacing(1) }}
                    color="primary"
                    checked={Boolean(props.willTeachKgToFiveProps?.value)}
                    {...props.willTeachKgToFiveProps}
                  />
                }
              />

              <FormControlLabel
                style={{ margin: theme.spacing(1) }}
                label="Grade 6 - Grade 8 (Primary school)"
                control={
                  <Checkbox
                    style={{ marginRight: theme.spacing(1) }}
                    color="primary"
                    checked={Boolean(props.willTeacSixToEightProps?.value)}
                    {...props.willTeacSixToEightProps}
                  />
                }
              />

              <FormControlLabel
                style={{ margin: theme.spacing(1) }}
                label="Grade 9 - Grade 12 (High school)"
                control={
                  <Checkbox
                    style={{ marginRight: theme.spacing(1) }}
                    color="primary"
                    checked={Boolean(props.willTeachNineToTwelveProps?.value)}
                    {...props.willTeachNineToTwelveProps}
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </OptionItem>

        {/* <OptionItem>
          <FormControl component="fieldset">
            <FormLabel>
              Preferred Tutoring Environment (Select one or both)
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                style={{ margin: theme.spacing(1) }}
                label="Online Environment (Video calls)"
                control={<CheckBox name="kg-5" color="primary" />}
              />

              <FormControlLabel
                style={{ margin: theme.spacing(1) }}
                label="In Person Study"
                control={<CheckBox name="6-8" color="primary" />}
              />
            </FormGroup>
          </FormControl>
        </OptionItem> */}
      </OptionsContainer>
    </QuestionContainer>
  );
};

export default Preferences;
