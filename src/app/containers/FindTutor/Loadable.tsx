/**
 *
 * Asynchronously loads the component for FindTutor
 *
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LinearProgress } from '@material-ui/core';

export const FindTutor = lazyLoad(
  () => import('./index'),
  module => module.FindTutor,
  { fallback: <LinearProgress /> },
);
