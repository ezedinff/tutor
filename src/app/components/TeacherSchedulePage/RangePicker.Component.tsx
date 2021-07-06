import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import styled from 'styled-components';
import { Forward } from '@material-ui/icons';

import { useStyles } from './styles';
import { RangePickersProps } from './types';
import { device } from 'styles/devices';
import { LoadableButton } from '../LoadableButton';

const ArrowNext = styled(Forward)`
  ${device.tablet} {
    display: none !important;
  }
`;

const RangesPicker = (props: RangePickersProps) => {
  const now = new Date();
  const anHourLater = new Date();
  anHourLater.setHours(now.getHours() + 1);

  interface IselectedTime {
    start: Date | null;
    end: Date | null;
  }

  const [selectedTime, setSelectedTime] = useState<IselectedTime>({
    start: now,
    end: anHourLater,
  });
  const styles = useStyles();

  const addTheRange = () => {
    if (selectedTime.end && selectedTime.start) {
      props.addRange(selectedTime.start, selectedTime.end);
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        alignItems="center"
      >
        <TimePicker
          className={styles.rangeItem}
          inputVariant="outlined"
          showTodayButton
          todayLabel="Now"
          label="Start From"
          value={selectedTime.start}
          onChange={v => setSelectedTime({ ...selectedTime, start: v })}
          error={Boolean(props.newRangeOverlapsError)}
          helperText={
            typeof props.newRangeOverlapsError === 'string' &&
            props.newRangeOverlapsError
          }
        />

        <ArrowNext className={styles.rangeItem} color="primary" />

        <TimePicker
          className={styles.rangeItem}
          inputVariant="outlined"
          showTodayButton
          todayLabel="Now"
          label="End At"
          value={selectedTime.end}
          onChange={v => setSelectedTime({ ...selectedTime, end: v })}
          error={Boolean(props.newRangeOverlapsError)}
          helperText={typeof props.newRangeOverlapsError === 'string' && ' '}
        />

        <LoadableButton
          onClick={addTheRange}
          className={styles.rangeItem}
          variant="contained"
          disableElevation
          color="primary"
          loading={Boolean(props.addingARange)}
        >
          Add
        </LoadableButton>
      </Box>

      <Typography color="textSecondary" variant="subtitle2">
        Choose ranges with at least an hour duration.
      </Typography>
    </Box>
  );
};

export default RangesPicker;
