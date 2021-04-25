import clsx from 'clsx';
import Home from './Home';
import Packages from './Packages';
import Login from './Login';

import { Route, Switch } from 'react-router-dom';
import { CustomerAppointmentStoreProvider } from '../store/CustomerAppointmentStore';

import Services from './Services';
import Registration from './Registration';
import AboutUs from './AboutUs';
import Dashboard from './Dashboard';
import WebPageOutlet from './WebPageOutlet';
import DashboardOutlet from './DashboardOutlet';
import UserManagement from './UserManagement';
import ItemManagement from './ItemManagement';
import Sales from './Sales';
import Branches from './Branches';
import ImageGallery from './Gallery';
import Stocks from './Stocks';
import Appointments from './CustomerAppointments';

import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Container, makeStyles } from '@material-ui/core';
import Snackbar from './Snackbar';
import { useUserStore } from '../store/UserStore';
import { useEffect, useState } from 'react';
import NotFound from './NotFound';
import { autorun } from 'mobx';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  background1: {
    background:
      'linear-gradient(90deg, rgba(255,183,183,0.5102415966386555) 0%, rgba(252,255,144,0.5102415966386555) 50%, rgba(0,212,255,0.42620798319327735) 100%);',
  },
}));

const Spacer = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.spacer}>{children}</div>;
};

const Root = () => {
  const classes = useStyles();
  const userStore = useUserStore();

  const [webViews, setWebViews] = useState([]);

  const allUserWebView = [
    { component: <Home />, path: '/' },
    { component: <AboutUs />, path: '/about_us' },
    {
      component: (
        <Spacer>
          <Container className={classes.container}>
            <Services />
          </Container>
        </Spacer>
      ),
      path: '/services',
    },
    {
      component: (
        <Spacer>
          <Container className={classes.container}>
            <Packages />
          </Container>
        </Spacer>
      ),
      path: '/packages',
    },
    {
      component: (
        <Container className={classes.container}>
          <Spacer>
            <ImageGallery />
          </Spacer>
        </Container>
      ),
      path: '/gallery',
    },
  ];

  const loggedInUserView = [
    {
      component: (
        <Container className={classes.container}>
          <Spacer>
            <Login />
          </Spacer>
        </Container>
      ),
      path: '/logout',
    },
  ];

  const notLoggedInUserView = [
    {
      component: (
        <Container className={classes.container}>
          <Spacer>
            <Login />
          </Spacer>
        </Container>
      ),
      path: '/login',
    },
    {
      component: (
        <Container className={classes.container}>
          <Spacer>
            <Registration />
          </Spacer>
        </Container>
      ),
      path: '/registration',
    },
  ];

  const customerViews = [
    {
      component: (
        <Spacer>
          <Container className={classes.container}>
            <Appointments />
          </Container>
        </Spacer>
      ),
      path: '/appointments',
    },
  ];

  const appViews = [
    {
      path: '/app/dashboard',
      component: <Dashboard />,
    },
    {
      path: '/app/user_management',
      component: <UserManagement />,
    },
    {
      path: '/app/item_management',
      component: <ItemManagement />,
    },
    {
      path: '/app/stock',
      component: <Stocks />,
    },
    {
      path: '/app/sales',
      component: <Sales />,
    },
    {
      path: '/app/branches',
      component: <Branches />,
    },
    {
      path: '/app/packages',
      component: <Packages />,
    },
    {
      path: '/app/services',
      component: <Services />,
    },
  ];

  useEffect(
    () =>
      autorun(() => {
        const anyLoggedInUserViews = [...allUserWebView, ...loggedInUserView];

        switch (userStore.role.toLowerCase()) {
          case 'customer':
            setWebViews([...anyLoggedInUserViews, ...customerViews]);
            break;

          case 'admin':
            setWebViews(anyLoggedInUserViews);
            break;

          case 'manager':
            setWebViews(anyLoggedInUserViews);
            break;

          case 'stock_keeper':
            setWebViews(anyLoggedInUserViews);
            break;

          default:
            setWebViews([...allUserWebView, ...notLoggedInUserView]);
        }
      }),
    [userStore.role]
  );

  return (
    <div className={classes.background1}>
      <Switch>
        {/* APP COMPONENTS */}
        <Route exact path="/app">
          <DashboardOutlet>
            {appViews.map(({ path, component }) => (
              <Route key={path} exact path={path}>
                {console.log(path)}
                {component}
              </Route>
            ))}
          </DashboardOutlet>
        </Route>

        {/* WEB PAGE COMPONENTS */}
        <Route path="/">
          <Route
            render={({ location }) => (
              <WebPageOutlet>
                <SwitchTransition>
                  <CSSTransition
                    key={location.pathname}
                    timeout={100}
                    classNames="fade"
                  >
                    <Switch location={location}>
                      {webViews.map(({ component, path }) => (
                        <Route key={path} exact path={path}>
                          {component}
                        </Route>
                      ))}
                      <Route key="notfound" path="/">
                        <NotFound />
                      </Route>
                    </Switch>
                  </CSSTransition>
                </SwitchTransition>
              </WebPageOutlet>
            )}
          />
        </Route>
      </Switch>
      <Snackbar />
    </div>
  );
};

export default Root;
