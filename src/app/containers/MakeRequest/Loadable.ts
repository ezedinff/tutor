/**
 *
 * Asynchronously loads the component for MakeRequest
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MakeRequest = lazyLoad(
  () => import('./index'),
  module => module.MakeRequest,
);
