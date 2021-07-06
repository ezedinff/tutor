import React from 'react';
import {
  Typography,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  SelectProps,
  TextFieldProps,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { QuestionContainer, OptionItem, OptionsContainer } from './styled';
import universities from 'utils/universities.json';
import { FormikErrors } from 'formik';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface CollegeInfoProps {
  universityOrCollageError?: String | boolean | undefined;
  universityOrCollageProps: SelectProps;
  universityApproved?: Boolean;

  startYearError?: FormikErrors<Date>;
  startYearValue: MaterialUiPickersDate;
  setStartYearValue: (d: MaterialUiPickersDate) => void;
  startYearApproved?: Boolean;

  endYearError?: FormikErrors<Date>;
  endYearValue: MaterialUiPickersDate;
  setEndYearValue: (d: MaterialUiPickersDate) => void;
  endYearApproved?: Boolean;

  studyLevelError?: String | boolean | undefined;
  studyLevelProps: SelectProps;
  studyLevelApproved?: Boolean;

  majorError?: String | boolean | undefined;
  majorProps: SelectProps;
  majorApproved?: Boolean;

  gpaError?: String | boolean | undefined;
  gpaProps: TextFieldProps;
  gpaApproved?: Boolean;
}

const CollegeInfo = (props: CollegeInfoProps) => {
  return (
    <QuestionContainer>
      <Typography variant="h6">
        1. Your college or university information
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Fill out some information about your college or univesity stuies below.
      </Typography>
      <OptionsContainer>
        <OptionItem fullWidth approved={props.universityApproved} showExtraIcon>
          <Select
            error={props.universityOrCollageError ? true : false}
            defaultValue=""
            variant="outlined"
            displayEmpty
            {...props.universityOrCollageProps}
          >
            <MenuItem value="">
              <em>Select College</em>
            </MenuItem>
            {universities.map(un => (
              <MenuItem value={un.name} key={un.code}>
                {un.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>
            {props.universityOrCollageError}
          </FormHelperText>
        </OptionItem>

        <OptionItem fullWidth approved={props.startYearApproved} showExtraIcon>
          <DatePicker
            views={['year']}
            name="startYear"
            label="Start Year"
            format="yyyy"
            inputVariant="outlined"
            error={props.startYearError ? true : false}
            helperText={props.startYearError}
            value={props.startYearValue}
            onChange={date => props.setStartYearValue(date)}
            // onChange={date =>
            //   props.onValueChange('college', 'startYear', date)
            // }
          />
          {/* <FormHelperText error>{props.startYearError}</FormHelperText> */}
        </OptionItem>

        <OptionItem fullWidth approved={props.endYearApproved} showExtraIcon>
          <DatePicker
            views={['year']}
            name="endYear"
            label="End Year / (Expected)"
            format="yyyy"
            inputVariant="outlined"
            error={props.endYearError ? true : false}
            helperText={props.endYearError}
            value={props.endYearValue}
            onChange={date => props.setEndYearValue(date)}
            // onChange={date => props.onValueChange('college', 'endYear', date)}
          />
        </OptionItem>

        <OptionItem fullWidth approved={props.studyLevelApproved} showExtraIcon>
          <Select
            defaultValue=""
            variant="outlined"
            displayEmpty
            error={props.studyLevelError ? true : false}
            {...props.studyLevelProps}
            // onChange={e =>
            //   props.onValueChange('college', 'studyLevel', e.target.value)
            // }
          >
            <MenuItem value="">
              <em>Latest Or Current Study Level</em>
            </MenuItem>
            <MenuItem value="bsc">BSC.</MenuItem>
            <MenuItem value="msc">MSC.</MenuItem>
            <MenuItem value="phd">PHD.</MenuItem>
          </Select>
          <FormHelperText>{props.studyLevelError}</FormHelperText>
        </OptionItem>

        <OptionItem fullWidth approved={props.majorApproved} showExtraIcon>
          <Select
            defaultValue=""
            variant="outlined"
            displayEmpty
            error={props.majorError ? true : false}
            {...props.majorProps}
            // onChange={e =>
            //   props.onValueChange('college', 'major', e.target.value)
            // }
          >
            <MenuItem value="">
              <em>Your Major</em>
            </MenuItem>
            <MenuItem value="cs">Computer Science</MenuItem>
            <MenuItem value="se">Software Engineering</MenuItem>
            <MenuItem value="is">Information Science</MenuItem>
          </Select>
          <FormHelperText>{props.majorError}</FormHelperText>
        </OptionItem>

        <OptionItem fullWidth approved={props.gpaApproved} showExtraIcon>
          <TextField
            variant="outlined"
            color="primary"
            placeholder="Last GPA OR C-GPA"
            type="number"
            error={props.gpaError ? true : false}
            helperText={props.gpaError}
            {...props.gpaProps}
            // onChange={e =>
            //   props.onValueChange('college', 'gpa', e.target.value)
            // }
          />
        </OptionItem>
      </OptionsContainer>
    </QuestionContainer>
  );
};

export default CollegeInfo;
