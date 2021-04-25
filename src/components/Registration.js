import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageContentArea from './PageContentArea';
import CenterLayout from './CenterLayout';
import RequiredStar from './RequiredStar';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useSnackbarStore } from '../store/SnackbarStore';

const FormContainer = styled.div`
  width: 50em;
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

function Registration() {
  const classes = useStyles();
  const snackbarStore = useSnackbarStore();

  const handleLogin = (ev) => {
    ev.preventDefault();

    snackbarStore.showError('invalid name');
  };
  return (
    <Paper className={classes.paper}>
      <PageContentArea>
        <CenterLayout>
          <FormContainer>
            <Form onSubmit={handleLogin}>
              <Row>
                <Col>
                  <Form.Label>
                    First name: <RequiredStar />
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
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>
                    Phone number: <RequiredStar />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Phone number"
                    required
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Form.Label>
                    Password: <RequiredStar />
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>
                    Confirm password: <RequiredStar />
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    required
                  />
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
    </Paper>
  );
}

export default Registration;
