import Home from './Home';
import Packages from './Packages';
import Login from './Login';

import { Route, Switch } from 'react-router-dom';

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
import Stocks from './Stocks';
import Appointments from './CustomerAppointments';
import WebPageCenteredOutlet from './WebPageCenteredOutlet';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const WebPageOutletRouter = ({ path, content }) => {
  return (
    <Route exact path={path}>
      <WebPageOutlet>{content}</WebPageOutlet>
    </Route>
  );
};

const WebPageCenteredOutletRouter = ({ path, content }) => {
  return (
    <Route
      render={({ location }) => (
        <Route exact path={path}>
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={1000} classNames="fade">
              <WebPageCenteredOutlet>{content}</WebPageCenteredOutlet>
            </CSSTransition>
          </TransitionGroup>
        </Route>
      )}
    />
  );
};

function Root() {
  return (
    <>
      <Switch>
        {/* MANAGEMENT DASHBOARDS */}
        <Route path="/app">
          <DashboardOutlet>
            <Route exact path="/app/dashboard">
              <Dashboard />
            </Route>

            <Route exact path="/app/user_management">
              <UserManagement />
            </Route>

            <Route exact path="/app/item_management">
              <ItemManagement />
            </Route>

            <Route exact path="/app/stock">
              <Stocks />
            </Route>

            <Route exact path="/app/sales">
              <Sales />
            </Route>

            <Route exact path="/app/branches">
              <Branches />
            </Route>

            <Route exact path="/app/packages">
              <Packages />
            </Route>

            <Route exact path="/app/services">
              <Services />
            </Route>
          </DashboardOutlet>
        </Route>

        {/* DASHBOARD PRINT VIEWS */}
        <Route path="/">
          <WebPageOutletRouter path="/" content={<Home />} />

          <WebPageOutletRouter path="/about_us" content={<AboutUs />} />

          <WebPageCenteredOutletRouter
            path="/services"
            content={<Services />}
          />

          <WebPageCenteredOutletRouter
            path="/packages"
            content={<Packages />}
          />

          <WebPageCenteredOutletRouter path="/login" content={<Login />} />

          <WebPageCenteredOutletRouter
            path="/registration"
            content={<Registration />}
          />

          <WebPageCenteredOutletRouter
            path="/appointments"
            content={<Appointments />}
          />
        </Route>
      </Switch>
    </>
  );
}

export default Root;
