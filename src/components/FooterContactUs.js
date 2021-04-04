import logo from '../images/brand_logo.png';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoEarth, IoLocationSharp } from 'react-icons/io5';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const Logo = styled.img`
  width: auto;
  height: auto;
  max-width: 10em;
  border-radius: 50%;
`;

function FooterContactUs() {
  return (
    <Container>
      <h2>Contact Us</h2>
      <Logo src={logo} alt="logo" />
      <br />
      <table>
        <tbody>
          <tr>
            <td>
              <IoLocationSharp />
            </td>
            <td>Buthgamuwa Rd, Sri jayawardenepura Kotte.</td>
          </tr>
          <tr>
            <td>
              <FaPhoneAlt />
            </td>
            <td>+9477-7999090</td>
          </tr>
          <tr>
            <td>
              <IoEarth />
            </td>
            <td>https://www.salonchandani.lk</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

export default FooterContactUs;
