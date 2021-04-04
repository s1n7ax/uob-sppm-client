import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageContentArea from './PageContentArea';
import CenterLayout from './CenterLayout';
import RequiredStar from './RequiredStar';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 50em;
`;

function Registration() {
  return (
    <PageContentArea>
      <CenterLayout>
        <FormContainer>
          <Form>
            <Row>
              <Col>
                <Form.Label>
                  Email address: <RequiredStar />
                </Form.Label>
                <Form.Control placeholder="First name" required />
              </Col>
              <Col>
                <Form.Label>
                  Last name: <RequiredStar />
                </Form.Label>
                <Form.Control placeholder="Last name" required />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Label>
                  Email address: <RequiredStar />
                </Form.Label>
                <Form.Control placeholder="Email address" required />
              </Col>
              <Col>
                <Form.Label>
                  Phone number: <RequiredStar />
                </Form.Label>
                <Form.Control placeholder="Phone number" required />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Label>
                  Password: <RequiredStar />
                </Form.Label>
                <Form.Control placeholder="Password" required />
              </Col>
              <Col>
                <Form.Label>
                  Confirm password: <RequiredStar />
                </Form.Label>
                <Form.Control placeholder="Confirm password" required />
              </Col>
            </Row>
            <br />

            <Row>
              <Col>
                <Button variant="pink" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </FormContainer>
      </CenterLayout>
    </PageContentArea>
  );
}

export default Registration;
