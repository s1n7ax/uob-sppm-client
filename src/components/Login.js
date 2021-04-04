import Form from 'react-bootstrap/Form';
import PageContentArea from './PageContentArea';
import CenterLayout from './CenterLayout';

import RequiredStar from './RequiredStar';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const Container = styled.div`
  width: 30em;
`;

function Login() {
  return (
    <PageContentArea>
      <CenterLayout>
        <Container>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                Email address: <RequiredStar />
              </Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>
                Password: <RequiredStar />
              </Form.Label>
              <Form.Control
                variant="danger"
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Button variant="pink" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </CenterLayout>
    </PageContentArea>
  );
}

export default Login;
