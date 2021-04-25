import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import logo from '../images/brand_logo.png';
import Button from '@material-ui/core/Button';
import { Route, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { purple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1000,
  },
  '& > *': {
    margin: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 250,
    alignItems: 'center',
    backgroundColor: '#343A40',
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },

  button: { color: 'white', borderColor: 'white', margin: '1em 1em 1em 1em' },
  selectedButton: { color: 'pink', borderBlockColor: 'pink' },
}));

export default function ProminentAppBar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <FlexCenter>
            <div>
              <LogoContainer>
                <Logo src={logo} alt="logo" />
                <FlexBottom>
                  <HeaderText>Salon</HeaderText>
                  <HeaderText>Chandani</HeaderText>
                </FlexBottom>
              </LogoContainer>
            </div>
            <div>
              <Route
                render={({ location }) =>
                  menus.map((menu) => {
                    return (
                      <Button
                        key={menu.text}
                        variant="outlined"
                        size="large"
                        className={clsx(
                          classes.button,
                          location.pathname === menu.url &&
                            classes.selectedButton
                        )}
                        onClick={() => history.push(menu.url)}
                      >
                        {menu.text}
                      </Button>
                    );
                  })
                }
              />
            </div>
          </FlexCenter>
        </Toolbar>
      </AppBar>
    </div>
  );
}

let FlexCenter = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

let LogoContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

let Logo = styled.img`
  width: 8em;
  height: auto;
  border-radius: 50%;
`;

let FlexBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

let HeaderText = styled.label`
  font-family: Sail;
  font-size: 40px;
`;

let menus = [
  { text: 'home', url: '/' },
  { text: 'about us', url: '/about_us' },
  { text: 'services', url: '/services' },
  { text: 'packages', url: '/packages' },
  { text: 'gallery', url: '/gallery' },
  { text: 'contact us', url: '/contact_us' },
  { text: 'login', url: '/login' },
  { text: 'register', url: '/registration' },
  { text: 'appointments', url: '/appointments' },
];
