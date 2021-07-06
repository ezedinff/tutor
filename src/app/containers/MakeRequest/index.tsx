/**
 *
 * MakeRequest
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectMakeRequest } from './selectors';
import { makeRequestSaga } from './saga';
import MakeRequestComponent from '../../components/MakeRequest';
import { Modal } from '@material-ui/core';
import Payment from '../Payment';
interface Props {}

export const MakeRequest = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: makeRequestSaga });
  const [open, setOpen] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const makeRequest = useSelector(selectMakeRequest);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const onFormChanged = values => {
  //  setOpen(true);
  };

  const onFormSumbit = (data) => {
    setOpen(true);
  }
  const onPaymentModalClosed = () => {
    setOpen(!open);
  }
  return (
    <>
      <Helmet>
        <title>MakeRequest</title>
        <meta name="description" content="Description of MakeRequest" />
      </Helmet>
      <Div>
        <MakeRequestComponent onFormSumbit={onFormSumbit} onFormChanged={onFormChanged} />
        <Payment
          open={open}
          onClose={onPaymentModalClosed}
          amount={100}
        />
      </Div>
    </>
  );
});

const Div = styled.div``;
