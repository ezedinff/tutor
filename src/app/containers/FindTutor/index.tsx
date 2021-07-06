/**
 *
 * FindTutor
 *
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, selectLoading, sliceKey } from './slice';
import { selectFindTutor } from './selectors';
import { findTutorSaga } from './saga';
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import TeacherCard from 'app/components/FindTutorPage/TeacherCard.component';
import TutorFilterForm from 'app/components/FindTutorPage/TutorFilter.form';
import { actions } from './slice';
import { QuestionContainer } from 'app/components/TeacherProfilePage/styled';
import filterForm from 'app/components/FindTutorPage/form';
const NoData = () => (
  <Container
    style={{
      minHeight: '128px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography color="textSecondary">No Data</Typography>
  </Container>
);
const initalValue = () => {
  const t = {};
  ['basic', 'advanced']
    .map(v => filterForm[v])
    .forEach(el => (t[el.name] = ''));
  return t;
};
export function FindTutor(props: any) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: findTutorSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const findTutor = useSelector(selectFindTutor);
  const isLoading = useSelector(selectLoading);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const [filterFormValues, setFilterFormValues] = useState(initalValue());
  const onFilterChanged = (filters) => {
    setFilterFormValues(filters);
    dispatch(
      actions.queryTutor({
        ...filters,
        language: filters.language ? filters.language : undefined,
        gender: filters.gender ? filters.gender : undefined,
        env: filters.env ? filters.env : undefined,
        grade: filters.grade ? filters.grade : undefined,
      }),
    );
  };
  return (
    <>
      <Helmet>
        <title>FindTutor</title>
        <meta name="description" content="Description of FindTutor" />
      </Helmet>
      <Div>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <TutorFilterForm
                values={filterFormValues}
                onFilterChanged={onFilterChanged}
              />
            </Grid>
            <Grid item md={9} xs={12}>
              <QuestionContainer>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Grid container spacing={2}>
                    {Array.isArray(findTutor.tutors) &&
                    findTutor.tutors.length ? (
                      findTutor.tutors.map(r => (
                        <Grid key={r.firstName} item md={4} xs={12}>
                          <TeacherCard teacher={r} />
                        </Grid>
                      ))
                    ) : (
                      <NoData />
                    )}
                  </Grid>
                )}
              </QuestionContainer>
            </Grid>
          </Grid>
        </Container>
      </Div>
    </>
  );
}

const Div = styled.div``;
