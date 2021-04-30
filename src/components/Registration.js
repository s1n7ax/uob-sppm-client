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
import { useEVValueState } from '../hooks/useEVValueState';
import { usernameValidation, nameValidation, passwordValidation } from '../validation/form-validation';
import CustomerAPI from '../api/CustomerAPI';
import { useUserStore } from '../store/UserStore'
import { useHistory } from 'react-router-dom';

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
  const userStore = useUserStore();
  const history = useHistory();

  const [firstName, setFirstName] = useEVValueState();
  const [lastName, setLastName] = useEVValueState();
  const [username, setUsername] = useEVValueState();
  const [password, setPassword] = useEVValueState();
  const [cPassword, setCPassword] = useEVValueState();
  const [phoneNumber, setPhoneNumber] = useEVValueState();

  const handleLogin = async (ev) => {
    ev.preventDefault();

    const usernameError = usernameValidation(username);
    if (usernameError.error) {
      snackbarStore.showError(usernameError.helpText)
      return;
    }

    const firstNameError = nameValidation(firstName);
    if (firstNameError.error) {
      snackbarStore.showError(firstNameError.helpText)
      return;
    }

    const lastNameError = nameValidation(lastName);
    if (lastNameError.error) {
      snackbarStore.showError(lastNameError.helpText)
      return;
    }

    const passwordError = passwordValidation(password);
    if (passwordError.error) {
      snackbarStore.showError(passwordError.helpText)
      return;
    }

    if (password !== cPassword) {
      snackbarStore.showError("Passwords does not match");
      return;
    }

    const customerAPI = new CustomerAPI(userStore.role);

    try {
      await customerAPI.createCustomer({
        ...customerTemplate,
        user: {
          ...customerTemplate.user,
          username,
          firstName,
          lastName,
          password,
        }
      })

      snackbarStore.showSuccess('Registraction successful!')
      history.push('/login');
    } catch (e) {
      console.error(e);
      snackbarStore.showError('Failed due to unknown error')
    }
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
                  <Form.Control onChange={setFirstName} placeholder="First name" required />
                </Col>
                <Col>
                  <Form.Label>
                    Last name: <RequiredStar />
                  </Form.Label>
                  <Form.Control onChange={setLastName} placeholder="Last name" required />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Form.Label>
                    Email address: <RequiredStar />
                  </Form.Label>
                  <Form.Control
                    onChange={setUsername}
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
                    onChange={setPhoneNumber}
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
                    onChange={setPassword}
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
                    onChange={setCPassword}
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

const customerTemplate = {
  "id": 0,
  "user": {
    "id": 0,
    "roles": [
      {
        "id": 6,
        "name": "CUSTOMER",
        "createdDate": new Date()
      }
    ],
    "username": "",
    "firstName": "",
    "lastName": "",
    "password": "",
    "active": true,
    "lastLogin": new Date(),
    "createdDate": new Date()
  },
  "createdDate": new Date()
}

export default Registration;
