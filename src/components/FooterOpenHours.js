import styled from 'styled-components';

let Container = styled.div`
  margin: 20px;
`;

let Table = styled.table`
  padding-right: 2em;
`;

function FooterOpenHours() {
  return (
    <Container>
      <h2>Opening Hours</h2>
      <Table>
        <tbody>
          <tr>
            <td>Monday -Tuesday:</td>
            <td>9.00 am - 5.00 pm</td>
          </tr>
          <tr>
            <td>Wednesday - Thursday:</td>
            <td>9.00 am - 5.00 pm</td>
          </tr>
          <tr>
            <td>Friday:</td>
            <td>9.00 am - 8.00 pm</td>
          </tr>
          <tr>
            <td>Saturday:</td>
            <td>9.00 am - 5.00 pm</td>
          </tr>
          <tr>
            <td>Sunday:</td>
            <td>Closed</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default FooterOpenHours;
