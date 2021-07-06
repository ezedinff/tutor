import React from 'react';
import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  ListItemSecondaryAction,
  Button,
  Collapse,
} from '@material-ui/core';
import { AvailabilityDialogProps } from './types';
import { TransitionProps } from '@material-ui/core/transitions';
import { Close, PlaylistAdd } from '@material-ui/icons';
import { sizesInNumber } from 'styles/devices';
import useWindowSize from 'utils/hooks/useWindowSize';
import { isBefore, differenceInHours } from 'date-fns';
import {
  IAPPOnlyAvialbiltyProprties,
  IAvialabilityAPP,
  IAvialableDayAPP,
  TDaysKey,
} from 'app/containers/TeacherSchedules/types';
import { dayNameMapper } from 'app/containers/TeacherSchedules/util';
import { useStyles } from './styles';
import RangesPicker from './RangePicker.Component';
import RangesChip from './RangeChip.component';

const Transition = React.forwardRef(
  (
    restProps: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) => {
    return <Slide direction="up" ref={ref} {...restProps} />;
  },
);

const AvailabilityDialog = (props: AvailabilityDialogProps) => {
  const styles = useStyles();

  const { screenWidth } = useWindowSize();

  const isScreenSizeBig = () => {
    return screenWidth ? screenWidth > sizesInNumber.tablet : false;
  };

  const doesDateRangeContradict = (start: Date, end: Date, day: string) => {
    let contradicts: string | boolean = false;
    const { schedules }: IAvialableDayAPP = props.avialableDays[day];
    const hourDifference = differenceInHours(end, start);

    if (isBefore(end, start)) {
      return 'Ending time can not come before starting time';
    }

    if (hourDifference < 1) {
      return `A range should last at least for an hour`;
    }

    schedules.every(schedule => {
      const overlaps =
        isBefore(start, schedule.end) && isBefore(schedule.start, end);
      if (overlaps) {
        contradicts = 'This value contradicts with one of your entries';
        // stop loop execution
        return false;
      }

      return true;
    });

    return contradicts;
  };

  const toogleRangePicker = (dayName: TDaysKey) => {
    const dayNames = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    if (dayNames.includes(dayName)) {
      const newProperties: IAPPOnlyAvialbiltyProprties = {
        rangeAdderVisible: !props.avialableDays[dayName]?.rangeAdderVisible,
        newRangeOverlapsError:
          props.avialableDays[dayName]?.newRangeOverlapsError,
        updatingValue: props.avialableDays[dayName]?.updatingValue,
      };

      props.setADaysAppOnlyProperties(dayName, newProperties);
    }
  };

  const removeADayRange = (dayName: TDaysKey, index: number) => {
    const avialableDaysCopy: IAvialabilityAPP = { ...props.avialableDays };
    const newRangesCopy = [...avialableDaysCopy[dayName]?.schedules];
    newRangesCopy.splice(index, 1);
    avialableDaysCopy[dayName] = {
      ...avialableDaysCopy[dayName],
      schedules: newRangesCopy,
    };
    props.setAvialabilityChanges(dayName, avialableDaysCopy);
    // setAvialbleDays(avialableDaysCopy);
  };

  const addDayRange = (dayKey: TDaysKey, start: Date, end: Date) => {
    // check if there is an overlap firsthand
    const overlapExists = doesDateRangeContradict(start, end, dayKey);

    const range = {
      start,
      end,
    };
    const avialableDaysCopy: IAvialabilityAPP = { ...props.avialableDays };
    const newRangesCopy = [...avialableDaysCopy[dayKey]?.schedules];

    if (overlapExists) {
      const newProperties: IAPPOnlyAvialbiltyProprties = {
        rangeAdderVisible: props.avialableDays[dayKey]?.rangeAdderVisible,
        newRangeOverlapsError: overlapExists,
        updatingValue: props.avialableDays[dayKey]?.updatingValue,
      };

      props.setADaysAppOnlyProperties(dayKey, newProperties);
    } else {
      newRangesCopy.push(range);
      avialableDaysCopy[dayKey] = {
        ...avialableDaysCopy[dayKey],
        schedules: newRangesCopy,
      };
      props.setAvialabilityChanges(dayKey, avialableDaysCopy);
    }

    // setAvialbleDays(avialableDaysCopy);
  };

  const getDayList = () => {
    // for (const day  of availabilities) {
    //     ret=
    // }

    const days = Object.keys(props.avialableDays) as TDaysKey[];

    return days.map((dayKey: TDaysKey) => {
      const day: IAvialableDayAPP = props.avialableDays[dayKey];

      const isRangeAdderOpen =
        props.avialableDays[dayKey] &&
        props.avialableDays[dayKey].rangeAdderVisible;

      const rangeButtonText = isRangeAdderOpen
        ? 'Hide Range Adder'
        : 'Add Range';

      return (
        <Box className={styles.dayList}>
          <ListItem>
            <ListItemText
              primary={day.dayName}
              secondary={`You have ${day.schedules?.length} available times on ${dayNameMapper[dayKey]}.`}
            />

            <ListItemSecondaryAction>
              <Button
                onClick={() => toogleRangePicker(dayKey)}
                color={isRangeAdderOpen ? 'secondary' : 'primary'}
              >
                {isRangeAdderOpen ? <Close /> : <PlaylistAdd />}
                {isScreenSizeBig() ? rangeButtonText : null}
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <Box p={1} display="flex" flexWrap="wrap">
            {day.schedules?.map((schedule, index) => (
              <RangesChip
                start={schedule.start}
                end={schedule.end}
                dayIsUpdating={Boolean(day.updatingValue)}
                onDelete={() => removeADayRange(dayKey, index)}
              />
            ))}
          </Box>
          <Collapse in={day.rangeAdderVisible}>
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <RangesPicker
                      addRange={(start: Date, end: Date) =>
                        addDayRange(dayKey, start, end)
                      }
                      newRangeOverlapsError={day.newRangeOverlapsError}
                      addingARange={day.updatingValue}
                    />
                  }
                />
              </ListItem>
            </List>
          </Collapse>
        </Box>
      );
    });
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <AppBar className={styles.topBar} title="The title">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.onClose}
            aria-label="close"
          >
            <Close />
          </IconButton>

          <Typography variant="h6">Edit Availability</Typography>
        </Toolbar>
      </AppBar>

      <List>{getDayList()}</List>
    </Dialog>
  );
};

export default AvailabilityDialog;
