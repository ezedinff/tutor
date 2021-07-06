import React, { useState, useEffect, memo } from 'react';
import { OptionItem, QuestionContainer } from '../TeacherProfilePage/styled';
import filterForm from './form';
import { ValueType } from 'react-select';
import GenerateForm from '../GenerateForm';
import {
  Accordion,
  AccordionDetails,
  withStyles,
  Typography,
} from '@material-ui/core';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    '&$expanded': {
      margin: '8px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);
const TutorFilterForm = (props: {
  values: any;
  onFilterChanged: (value: ValueType<any>) => void;
}) => {
  const [expanded, setExpanded] = useState('BASIC');
  return (
    <>
      {['basic', 'advanced'].map(v => (
        <Accordion
          key={v}
          square
          expanded={expanded === v.toUpperCase()}
          onChange={() => setExpanded(v.toUpperCase())}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography
              style={{ textTransform: 'capitalize' }}
            >{`${v} Filter`}</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <GenerateForm
              elements={filterForm[v]}
              values={props.values}
              onChanges={props.onFilterChanged}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
export default TutorFilterForm;
