/**
 *
 * Asynchronously loads the component for TeacherProfile
 *
 */
import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { lazyLoad } from 'utils/loadable';

export const TeacherProfile = lazyLoad(
  () => import('./index'),
  module => module.TeacherProfile,
  {
    fallback: <LinearProgress />,
  },
);
