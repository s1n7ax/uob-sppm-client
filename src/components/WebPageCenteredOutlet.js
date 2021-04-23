import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const WebPageCenteredOutlet = ({ children }) => {
  const classes = useStyles();

  return (
    <MainContainer>
      <Header />
      <Container className={classes.container} maxWidth="lg">
        {children}
      </Container>
      <Footer />
    </MainContainer>
  );
};

export default WebPageCenteredOutlet;
