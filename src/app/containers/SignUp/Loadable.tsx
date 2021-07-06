/**
 * Asynchronously loads the component for SignUp
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingScreen } from 'app/components/LoadingScreens';

export const SignUp = lazyLoad(
  () => import('./index'),
  module => module.SignUp,
  { fallback: <LoadingScreen /> },
);
