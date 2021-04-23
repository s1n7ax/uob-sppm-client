import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styled from 'styled-components';
import logo from '../images/brand_logo.png';
import { Link } from 'react-router-dom';

let Container = styled.div`
  margin: 0 5em 0 5em;
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

function Header() {
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

  let menuContent = menus.map((menu, index) => {
    return menu.subMenu ? (
      <NavDropdown key={index} title={menu.text} id="basic-nav-dropdown">
        {menu.subMenu.map((sub, index) => {
          return (
            <NavDropdown.Item key={index}>
              <Link to={sub.url}>{sub.text}</Link>
            </NavDropdown.Item>
          );
        })}
      </NavDropdown>
    ) : (
      <Nav.Link key={index}>
        <Link to={menu.url}>{menu.text}</Link>
      </Nav.Link>
    );
  });

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
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
  );
}

export default Header;
