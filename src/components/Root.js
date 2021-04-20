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
          <WebPageOutlet>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/app/dashboard/print">
              <Dashboard />
            </Route>

            <Route exact path="/app/user_management/print">
              <UserManagement />
            </Route>

            <Route exact path="/app/stock/print">
              <Stocks />
            </Route>

            <Route exact path="/app/sales/print">
              <Sales />
            </Route>

            <Route exact path="/app/branches/print">
              <Branches />
            </Route>

            <Route exact path="/app/packages/print">
              <Packages />
            </Route>

            <Route exact path="/app/services/print">
              <Services />
            </Route>

            <Route exact path="/about_us">
              <AboutUs />
            </Route>

            <Route exact path="/services">
              <Services />
            </Route>

            <Route exact path="/packages">
              <Packages />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/registration">
              <Registration />
            </Route>
          </WebPageOutlet>
        </Route>
      </Switch>
    </>
  );
}

export default Root;
