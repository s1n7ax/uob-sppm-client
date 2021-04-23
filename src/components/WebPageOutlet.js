import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WebPageOutlet = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

export default WebPageOutlet;
