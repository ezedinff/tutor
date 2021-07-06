import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import GenerateForm from '../GenerateForm';
import { ValueType } from 'react-select';
import {
  initial,
  possibleChoices,
  requestForm,
  scheduleInitalValue,
  schedules,
} from './form';
import { QuestionContainer } from '../TeacherProfilePage/styled';
import { ScheduleSelector } from '../ScheduleSelector';
const initalValue = () => {
  const t = {};
  requestForm.forEach(el => (t[el.name] = ''));
  return t;
};
const intv = scheduleInitalValue(schedules['desktop']);
function MakeRequest(props: {
  onFormChanged: (value: ValueType<any>) => void;
  onFormSumbit: (value: ValueType<any>) => void;
}) {
  const [request, setRequest] = useState(initalValue());
  const [platform, setPlatform] = useState('desktop');
  const [schedule, setSchedule] = useState(intv);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    props.onFormChanged(request);
    if (window.innerWidth <= 600) {
      setPlatform('mobile');
    }
  }, [props, request]);

  const onFormSumbit = () => {
    const data = {
      ...request,
      schedule: prepareSchedule(schedule),
    };
    console.log(data, schedule);
    props.onFormSumbit(data);
  };
  const prepareSchedule = schedule => {
    if (check) return 'flexible';
    const t = [];
    for (const key in schedule) {
      const day = key.split('-');
      if (day.length === 2 && schedule[key]) {
        const da = {
          day: day[0],
          portionOfADay: possibleChoices[Number(day[1])],
        };
        //@ts-ignore
        t.push(da);
      }
    }
    return t;
  };
  return (
    <Container maxWidth="md" >
      <QuestionContainer style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" color="textSecondary">
          Make a request
        </Typography>
        <br />
        <GenerateForm
          elements={requestForm}
          values={request}
          onChanges={setRequest}
        />
        <ScheduleSelector
          check={check}
          setCheck={setCheck}
          platform={platform}
          schedule={schedule}
          setSchedule={setSchedule}
        />
        <Button style={{ alignSelf: "flex-end" }} color="primary" variant="contained" onClick={onFormSumbit}>
          Request
          </Button>
      </QuestionContainer>
    </Container>
  );
}
export default MakeRequest;
