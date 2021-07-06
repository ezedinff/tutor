import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingScreen } from 'app/components/LoadingScreens';

export const LogIn = lazyLoad(
  () => import('./index'),
  module => module.LogIn,
  { fallback: <LoadingScreen /> },
);
