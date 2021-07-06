import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { authTokenName, refereshTokenName } from 'utils/constants';

const Protected = ({ component: Component, ...props }: RouteProps) => {
  const authToken = window.localStorage.getItem(authTokenName);
  const refreshToken = window.localStorage.getItem(refereshTokenName);

  if (!Component) return null;

  return (
    <Route
      {...props}
      render={compProps =>
        authToken && refreshToken ? (
          <Component {...compProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default Protected;
