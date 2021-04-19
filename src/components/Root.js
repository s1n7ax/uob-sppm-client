import Home from './Home';
import Packages from './Packages';
import Login from './Login';

import { Route } from 'react-router-dom';

import Services from './Services';
import Registration from './Registration';
import AboutUs from './AboutUs';
import Dashboard from './Dashboard';
import WebPageOutlet from './WebPageOutlet';
import DashboardOutlet from './DashboardOutlet';
import UserManagement from './UserManagement';
import Sales from './Sales';
import Branches from './Branches';

function Root() {
  return (
    <>
      <Route exact path="/app/dashboard">
        <DashboardOutlet>
          <Dashboard />
        </DashboardOutlet>
      </Route>
      <Route exact path="/app/user_management">
        <DashboardOutlet>
          <UserManagement />
        </DashboardOutlet>
      </Route>
      <Route exact path="/app/stock">
        <DashboardOutlet>
          <Dashboard />
        </DashboardOutlet>
      </Route>
      <Route exact path="/app/sales">
        <DashboardOutlet>
          <Sales />
        </DashboardOutlet>
      </Route>
      <Route exact path="/app/branches">
        <DashboardOutlet>
          <Branches />
        </DashboardOutlet>
      </Route>
      <Route exact path="/">
        <WebPageOutlet>
          <Home />
        </WebPageOutlet>
      </Route>

      <Route exact path="/about_us">
        <WebPageOutlet>
          <AboutUs />
        </WebPageOutlet>
      </Route>

      <Route exact path="/services">
        <WebPageOutlet>
          <Services />
        </WebPageOutlet>
      </Route>

      <Route exact path="/packages">
        <WebPageOutlet>
          <Packages />
        </WebPageOutlet>
      </Route>

      <Route exact path="/login">
        <WebPageOutlet>
          <Login />
        </WebPageOutlet>
      </Route>

      <Route exact path="/registration">
        <WebPageOutlet>
          <Registration />
        </WebPageOutlet>
      </Route>
    </>
  );
}

export default Root;
