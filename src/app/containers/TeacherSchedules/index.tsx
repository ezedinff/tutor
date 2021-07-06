/**
 *
 * TeacherSchedules
 *
 */

import React, { CSSProperties, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  WeekView,
  MonthView,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { selectTeacherSchedules } from './selectors';
import { teacherSchedulesSaga } from './saga';
import { Fab, useTheme } from '@material-ui/core';
import { tasks } from './examples';
import { EventAvailable } from '@material-ui/icons';
import AvailabilityDialog from 'app/components/TeacherSchedulePage/Availability.Dialog';
import { selectUser } from '../UserLayout/selectors';
import { apiAvialabilityToAppAvalability } from './util';
import {
  IAPPOnlyAvialbiltyProprties,
  IAvialabilityAPP,
  TDaysKey,
} from './types';

interface Props {}

const currentDate = '2020-12-04';

export function TeacherSchedules(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: teacherSchedulesSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const teacherSchedules = useSelector(selectTeacherSchedules);
  const user = useSelector(selectUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const theme = useTheme();

  const [openAvailabilityDialog, setOpenAvailabilityDialog] = useState(false);

  const toogleAvailabilityDialog = () =>
    setOpenAvailabilityDialog(!openAvailabilityDialog);

  interface APCProps extends Appointments.AppointmentProps {
    style?: CSSProperties;
  }

  const AppointmentComponent = ({
    children,
    style,
    ...restProps
  }: APCProps) => (
    <Appointments.Appointment
      {...restProps}
      style={{ ...style, backgroundColor: theme.palette.primary.light }}
    >
      {children}
    </Appointments.Appointment>
  );

  const setAvialabilityChanges = (
    dayKey: TDaysKey,
    newSchedules: IAvialabilityAPP,
  ) => {
    dispatch(
      actions.updateAvialabilityChanges({
        day: dayKey,
        newAvailabilitySchedules: newSchedules,
      }),
    );
  };

  useEffect(() => {
    if (user && user.avialabilitySchedule) {
      const { avialabilitySchedule } = user;
      const appConvertedAvialability = apiAvialabilityToAppAvalability(
        avialabilitySchedule,
      );
      dispatch(actions.setAvialabilitySchedule(appConvertedAvialability));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.avialabilitySchedule]);

  const setADaysAppOnlyProperties = (
    day: TDaysKey,
    properties: IAPPOnlyAvialbiltyProprties,
  ) => {
    dispatch(
      actions.setADaysExtraProperties({
        day,
        properties,
      }),
    );
  };

  return (
    <>
      <Helmet>
        <title>Teacher Schedules</title>
        <meta name="description" content="Dade tutors schedules" />
      </Helmet>
      <Div>
        <Scheduler data={tasks}>
          <ViewState
            defaultCurrentViewName="daily"
            defaultCurrentDate={currentDate}
          />
          <MonthView name="monthly" />
          <WeekView name="weekly" />
          <DayView name="daily" startDayHour={3} endDayHour={14} />
          <Toolbar />

          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments appointmentComponent={AppointmentComponent} />
          <AppointmentTooltip showCloseButton showOpenButton />
        </Scheduler>

        <AvailabilityDialog
          open={openAvailabilityDialog}
          onClose={toogleAvailabilityDialog}
          avialableDays={teacherSchedules.avialabilitySchedule}
          setADaysAppOnlyProperties={setADaysAppOnlyProperties}
          setAvialabilityChanges={setAvialabilityChanges}
        />

        <Fab
          style={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            zIndex: 10,
          }}
          color="primary"
          title="Schedule Settings"
          onClick={toogleAvailabilityDialog}
          // variant="extended"
        >
          <EventAvailable />
          {/* Availability */}
          {/* {props.savingProfile && (
            <CircularProgress
              size={68}
              style={{ position: 'absolute', top: -6, left: -6, zIndex: 1 }}
            />
          )} */}
        </Fab>
      </Div>
    </>
  );
}

const Div = styled.div``;
