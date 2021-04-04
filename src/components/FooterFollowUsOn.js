import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaFacebookMessenger,
} from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px;
`;

const iconStyles = `
  height: 40px;
  width: 40px;
  margin: 10px;

  border-collapse: separate;
  border-spacing: 1000px;
  border-radius: 50%;
`;

const FacebookIcon = styled(FaFacebook)`
  ${iconStyles}
`;

const TwitterIcon = styled(FaTwitter)`
  ${iconStyles}
`;

const MessengerIcon = styled(FaFacebookMessenger)`
  ${iconStyles}
`;

const InstagramIcon = styled(FaInstagram)`
  ${iconStyles}
`;

function FooterFollowUsOn() {
  return (
    <Container>
      <h2>Follow Us On</h2>
      <FacebookIcon />
      <MessengerIcon />
      <InstagramIcon />
      <TwitterIcon />
    </Container>
  );
}

export default FooterFollowUsOn;
