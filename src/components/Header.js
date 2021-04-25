import clsx from 'clsx';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styled from 'styled-components';
import logo from '../images/brand_logo.png';
import { Route, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { useUserStore } from '../store/UserStore';
import { useEffect, useState } from 'react';
import { Observer, useObserver } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { useSnackbarStore } from '../store/SnackbarStore';
import { logout } from '../api/organization';

const Container = styled.div`
  margin: 0 5em 0 5em;
  display: grid;
  grid-template-columns: auto auto;
  padding: 20px;
`;

const Logo = styled.img`
  width: 8em;
  height: auto;
  border-radius: 50%;
`;

const FlexBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const HeaderText = styled.label`
  font-family: Sail;
  font-size: 40px;
`;

const useStyles = makeStyles(() => ({
  button: {
    color: 'white',
    borderColor: 'white',
  },
  selectedButton: {
    color: 'var(--primary-color)',
    borderColor: 'var(--primary-color)',
  },
}));

const Header = () => {
  const userStore = useUserStore();
  const snackbarStore = useSnackbarStore();
  const history = useHistory();
  const [menus, setMenus] = useState([]);

  const anyUserMenus = [
    { text: 'home', url: '/' },
    { text: 'about us', url: '/about_us' },
    { text: 'services', url: '/services' },
    { text: 'packages', url: '/packages' },
    { text: 'gallery', url: '/gallery' },
    { text: 'contact us', url: '/contact_us' },
  ];

  const loggedInUserMenus = [
    {
      text: 'logout',
      url: '/logout',
      onClick: async () => {
        try {
          await logout();
          userStore.logout();
          snackbarStore.showSuccess('Logged out successfully');
          history.push('/');
        } catch (e) {
          snackbarStore.showError('Logout failed');
        }
      },
    },
  ];

  const notLoggedInUserMenus = [
    { text: 'login', url: '/login' },
    { text: 'register', url: '/registration' },
  ];

  const employeeMenus = [{ text: 'dashboard', url: '/app/dashboard' }];

  let customerMenus = [{ text: 'appointments', url: '/appointments' }];

  useEffect(
    () =>
      autorun(() => {
        const anyLoggedInUserMenus = [...anyUserMenus, ...loggedInUserMenus];

        switch (userStore.role.toLowerCase()) {
          case 'customer':
            setMenus([...anyLoggedInUserMenus, ...customerMenus]);
            break;

          case 'admin':
            setMenus([...anyLoggedInUserMenus, ...employeeMenus]);
            break;

          case 'manager':
            setMenus([...anyLoggedInUserMenus, ...employeeMenus]);
            break;

          case 'stock_keeper':
            setMenus([...anyLoggedInUserMenus, ...employeeMenus]);
            break;

          case '':
            setMenus([...anyUserMenus, ...notLoggedInUserMenus]);
            break;

          default:
            setMenus([]);
        }
      }),
    [userStore.role]
  );

  const { button, selectedButton } = useStyles();

  let menuContent = menus.map((menu) => {
    return (
      <Route
        key={menu.text}
        render={({ location }) => (
          <Nav.Link>
            <Button
              className={clsx(
                button,
                location.pathname === menu.url && selectedButton
              )}
              onClick={
                menu.onClick ? menu.onClick : () => history.push(menu.url)
              }
            >
              {menu.text}
            </Button>
          </Nav.Link>
        )}
      />
    );
  });

  return (
    <Observer>
      {() => (
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand onClick={() => history.push('/')}>
            <Container>
              <Logo src={logo} alt="logo" />
              <FlexBottom>
                <HeaderText>Salon</HeaderText>
                <HeaderText>Chandani</HeaderText>
              </FlexBottom>
            </Container>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">{menuContent}</Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </Observer>
  );

  /*
  return useObserver(() => (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand onClick={() => history.push('/')}>
        <Container>
          <Logo src={logo} alt="logo" />
          <FlexBottom>
            <HeaderText>Salon</HeaderText>
            <HeaderText>Chandani</HeaderText>
          </FlexBottom>
        </Container>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">{menuContent}</Nav>
      </Navbar.Collapse>
    </Navbar>
  ));
	*/
};

export default Header;
