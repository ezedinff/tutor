/**
 *
 * Asynchronously loads the component for TeacherSchedules
 *
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LinearProgress } from '@material-ui/core';

export const TeacherSchedules = lazyLoad(
  () => import('./index'),
  module => module.TeacherSchedules,
  {
    fallback: <LinearProgress />,
  },
);
