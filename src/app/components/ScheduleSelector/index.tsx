import {
  Container,
  IconButton,
  Typography,
  withStyles,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { Fragment, useState } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { scheduleInitalValue, schedules } from '../MakeRequest/form';

const CheckedButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '8px 0',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}))(IconButton);

const UnCheckedButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.primary.contrastText,
    margin: '8px 0',
  },
}))(IconButton);
export function ScheduleSelector(props) {
  const checkAll = () => {
    props.setCheck(!props.check);
    for (const k in props.schedule) {
      if (props.schedule[k] !== undefined) {
        props.schedule[k] = !props.check;
      }
    }
    props.setSchedule({ ...props.schedule });
  };
  const checkOne = key => {
    props.schedule[key] = !props.schedule[key];
    props.setSchedule({ ...props.schedule });
    console.log(props.schedule[key], props.schedule, key);
  };
  return (
    <Fragment>
      <Grid container style={{ marginTop: '24px' }}>
        <Grid item>
          <Typography variant="subtitle2" color="textSecondary">
            When do you prefer lessons to occur?
          </Typography>
          {props.check ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckedButton onClick={() => checkAll()}>
                <AllInclusiveIcon />
              </CheckedButton>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                style={{ marginLeft: '16px' }}
              >
                I'm flexible
              </Typography>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <UnCheckedButton onClick={() => checkAll()}>
                <AllInclusiveIcon />
              </UnCheckedButton>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                style={{ marginLeft: '16px' }}
              >
                I'm flexible
              </Typography>
            </div>
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={9}>
          {schedules[props.platform].map((row, rowIndex) => {
            return (
              <Grid
                key={`row-${rowIndex}`}
                container
                justify="space-between"
                alignItems="center"
              >
                {row.map((d, index) => (
                  <Grid
                    key={`${d.label}-${rowIndex}`}
                    xs={index ? (props.platform === 'mobile' ? 3 : 1) : 2}
                    item
                    style={{ fontSize: '0.8em', textAlign: 'center' }}
                  >
                    {rowIndex ? (
                      index ? (
                        props.schedule[`${d.label}`] ? (
                          <CheckedButton onClick={() => checkOne(`${d.label}`)}>
                            <CheckIcon />
                          </CheckedButton>
                        ) : (
                          <UnCheckedButton
                            onClick={() => checkOne(`${d.label}`)}
                          >
                            <CheckIcon />
                          </UnCheckedButton>
                        )
                      ) : (
                        d.label
                      )
                    ) : (
                      d.label
                    )}
                  </Grid>
                ))}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Fragment>
  );
}
