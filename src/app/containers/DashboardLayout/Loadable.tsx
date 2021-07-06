/**
 *
 * Asynchronously loads the component for DashboardLayout
 *
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingScreen } from 'app/components/LoadingScreens';

export const DashboardLayout = lazyLoad(
  () => import('./index'),
  module => module.DashboardLayout,
  { fallback: <LoadingScreen /> },
);
