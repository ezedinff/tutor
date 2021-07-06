/**
 *
 * UserLayout
 *
 */

import React, { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { selectUserLayout } from './selectors';
import { userLayoutSaga } from './saga';

interface Props {
  children: ReactNode | ReactNode[];
}

export function UserLayout(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userLayoutSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userLayout = useSelector(selectUserLayout);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCurrentUser());
  }, [dispatch]);

  return <>{props.children}</>;
}
