/**
 *
 * Asynchronously loads the component for ClientLayout
 *
 */
import React from 'react';
import { LoadingScreen } from 'app/components/LoadingScreens';
import { lazyLoad } from 'utils/loadable';

export const ClientLayout = lazyLoad(
  () => import('./index'),
  module => module.ClientLayout,
  { fallback: <LoadingScreen /> },
);
