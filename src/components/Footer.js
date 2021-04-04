import Navbar from 'react-bootstrap/Navbar';
import FooterContactUs from './FooterContactUs';
import FooterOpenHours from './FooterOpenHours';
import FooterFollowUsOn from './FooterFollowUsOn';
import { Container, Grid } from '@material-ui/core';
import styled from 'styled-components';

function Footer() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <CustomContainer>
        <Container>
          <Grid container justify="center">
            <Grid item xs={12} sm={4}>
              <FooterContactUs />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FooterOpenHours />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FooterFollowUsOn />
            </Grid>
          </Grid>
        </Container>
      </CustomContainer>
    </Navbar>
  );
}

const CustomContainer = styled.div`
  width: 100%;
  height: 100%;
  color: white;
`;

export default Footer;
