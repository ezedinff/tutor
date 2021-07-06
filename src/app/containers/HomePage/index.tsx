import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Logo } from 'app/components/Logo';
import { Link } from 'react-router-dom';
import { authTokenName } from 'utils/constants';

const useStyles = makeStyles({
  buttons: {
    marginLeft: 20,
    minWidth: 200,
  },
});

export function HomePage() {
  const style = useStyles();
  const token = localStorage.getItem(authTokenName);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      <TopBar>
        <Logo size="small" bold />
        <RightSide>
          {token ? (
            <Button
              disableElevation
              component={Link}
              to="/dashboard"
              color="primary"
              variant="contained"
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button
                disableElevation
                component={Link}
                to="/login"
                color="primary"
                variant="outlined"
                className={style.buttons}
              >
                Log In
              </Button>
              <Button
                disableElevation
                component={Link}
                to="/signup"
                color="primary"
                variant="contained"
                className={style.buttons}
              >
                Sign up
              </Button>
            </>
          )}
        </RightSide>
      </TopBar>
    </>
  );
}

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
