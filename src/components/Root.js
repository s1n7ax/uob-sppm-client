import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Packages from './Packages';
import Login from './Login';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Services from './Services';
import Registration from './Registration';
import AboutUs from './AboutUs';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: stretch;
`;

function Root() {
  return (
    <Router>
      <Container>
        <Header />

        <Route exact path="/">
          <Home />
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

        <Footer />
      </Container>
    </Router>
  );
}

export default Root;
