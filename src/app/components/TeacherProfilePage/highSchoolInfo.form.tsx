import React from 'react';
import {
  TextField,
  Typography,
  // Select,
  // Chip,
  // Input,
  // MenuItem,
  // FormControl,
  // InputLabel,
  // Box,
  Divider,
  TextFieldProps,
} from '@material-ui/core';
import {
  QuestionContainer,
  OptionsContainer,
  OptionItem,
  SeparatorContainer,
  DividerText,
} from './styled';

interface HighSchoolInfoProps {
  eslceScoreError: string | false | undefined;
  eslceScoreProps: TextFieldProps;
  eslceApproved?: Boolean;

  highSchoolNameError: string | false | undefined;
  highSchoolNameProps: TextFieldProps;
  highSchholNameApproved?: Boolean;

  satScoreError: string | false | undefined;
  satScoreProps: TextFieldProps;
  satScoreApproved?: Boolean;

  ieltsScoreError: string | false | undefined;
  ieltsScoreProps: TextFieldProps;
  ieltsScoreApproved?: Boolean;

  toeflScoreError: string | false | undefined;
  toeflScoreProps: TextFieldProps;
  toeflScoreApproved?: Boolean;
}

// const specialTests = ['SAT', 'IELTS', 'TOEFL'];

const HighSchoolInfo = (props: HighSchoolInfoProps) => {
  // const [selectedTests, setSelectedTests] = useState<string[]>([]);

  // const handleTestChange = (e: React.ChangeEvent<{ value: unknown }>) => {
  //   setSelectedTests(e.target.value as string[]);
  // };

  return (
    <QuestionContainer>
      <Typography variant="h6">
        2. Your high school study information
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Fill out some information about your highschool stuies below.
      </Typography>
      <OptionsContainer>
        <OptionItem fullWidth showExtraIcon approved={props.eslceApproved}>
          <TextField
            variant="outlined"
            label="ESLCE Score"
            placeholder="High school Leaving Exam Score"
            type="number"
            error={Boolean(props.eslceScoreError)}
            helperText={props.eslceScoreError}
            {...props.eslceScoreProps}
          />
        </OptionItem>

        <OptionItem
          fullWidth
          showExtraIcon
          approved={props.highSchholNameApproved}
        >
          <TextField
            variant="outlined"
            label="High school name"
            placeholder="Last high school name"
            error={Boolean(props.highSchoolNameError)}
            helperText={props.highSchoolNameError}
            {...props.highSchoolNameProps}
          />
        </OptionItem>
      </OptionsContainer>
      <SeparatorContainer>
        <Divider />
        <DividerText variant="subtitle2" color="textSecondary">
          Fill test scores for some special tests below, if you took any or all
          of them.
        </DividerText>
      </SeparatorContainer>
      <OptionsContainer>
        <OptionItem fullWidth showExtraIcon approved={props.satScoreApproved}>
          <TextField
            variant="outlined"
            label="SAT Score (Optional)"
            placeholder="SAT Score (Optional)"
            type="number"
            error={Boolean(props.satScoreError)}
            helperText={props.satScoreError}
            {...props.satScoreProps}
          />
        </OptionItem>

        <OptionItem fullWidth showExtraIcon approved={props.ieltsScoreApproved}>
          <TextField
            variant="outlined"
            label="IELTS Score (Optional)"
            placeholder="IELTS Score (Optional)"
            type="number"
            error={Boolean(props.ieltsScoreError)}
            helperText={props.ieltsScoreError}
            {...props.ieltsScoreProps}
          />
        </OptionItem>

        <OptionItem fullWidth showExtraIcon approved={props.toeflScoreApproved}>
          <TextField
            variant="outlined"
            label="TOEFL Score (Optional)"
            placeholder="Last TOEFL Score (Optional)"
            type="number"
            error={Boolean(props.toeflScoreError)}
            helperText={props.toeflScoreError}
            {...props.toeflScoreProps}
          />
        </OptionItem>
      </OptionsContainer>
    </QuestionContainer>
  );
};

export default HighSchoolInfo;
