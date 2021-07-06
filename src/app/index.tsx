/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { SignUp } from './containers/SignUp/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { AppMessages } from './containers/AppMessages';
import { LogIn } from './containers/LogIn/Loadable';
import { DashboardLayout } from './containers/DashboardLayout/Loadable';
import { useTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { TeacherProfile } from './containers/TeacherProfile/Loadable';
import { TeacherSchedules } from './containers/TeacherSchedules/Loadable';
import Protected from './protected.route';
import { UserLayout } from './containers/UserLayout';
import { ClientLayout } from './containers/ClientLayout/Loadable';
import { FindTutor } from './containers/FindTutor/Loadable';
import TutorProfile from './components/FindTutorPage/TutorProfile';
import { MakeRequest } from './containers/MakeRequest';
import Payment from './containers/Payment';
import ConfirmPayment from './containers/Payment/confirm';

export function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Helmet titleTemplate="%s - Dade Tutors" defaultTitle="Dade Tutors">
          <meta name="description" content="Hire tutors in ethiopia" />
        </Helmet>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />

          <UserLayout>
            <Route path="/dashboard/:path?" exact>
              <DashboardLayout>
                <Switch>
                  <Protected
                    exact
                    path="/dashboard"
                    component={TeacherProfile}
                  />
                  <Protected
                    path="/dashboard/schedules"
                    component={TeacherSchedules}
                  />
                </Switch>
              </DashboardLayout>
            </Route>

            <Route path="/client/:path?" exact>
              <ClientLayout>
                <Switch>
                  <Protected exact path="/client" component={FindTutor} />
                  <Protected
                    path="/client/sus"
                    component={() => <h3>SUS</h3>}
                  />
                </Switch>
              </ClientLayout>
            </Route>

            <Route path="/tutor/:path*" exact>
              <ClientLayout>
                <Switch>
                  <Protected
                    path="/tutor/:slug/request"
                    component={MakeRequest}
                  />
                  <Protected path="/tutor/:slug" component={TutorProfile} />
                </Switch>
              </ClientLayout>
            </Route>

            <Route path="/payment/:path*" exact>
              <ClientLayout>
                <Switch>
                  <Protected
                    path="/payment"
                    component={Payment}
                  />
                  <Protected path="/payment/confirm/:orderID" component={ConfirmPayment} />
                </Switch>
              </ClientLayout>
            </Route>
          </UserLayout>
          <Route component={NotFoundPage} />
        </Switch>

        <AppMessages />
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}
