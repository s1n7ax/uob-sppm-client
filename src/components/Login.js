import Form from 'react-bootstrap/Form';
import PageContentArea from './PageContentArea';
import CenterLayout from './CenterLayout';

import RequiredStar from './RequiredStar';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import { useSnackbarStore } from '../store/SnackbarStore';
import { useHistory } from 'react-router';
import { login } from '../api/login';
import { useEVValueState } from '../hooks/useEVValueState';
import { useUserStore } from '../store/UserStore';

const Container = styled.div`
  width: 30em;
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

function Login() {
  const classes = useStyles();

  const [username, setUsername] = useEVValueState('');
  const [password, setPassword] = useEVValueState('');

  const snackbarStore = useSnackbarStore();
  const userStore = useUserStore();
  const history = useHistory();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const user = await login(username, password);
      userStore.setUserDetailsFromPublicUser(user);
      snackbarStore.showSuccess(`Welcome ${user.firstName} ${user.lastName}!`);
      history.push('/');
    } catch (e) {
      console.error(e);
      if (e.message === '401') {
        snackbarStore.showError('Invalid username or password');
      } else {
        snackbarStore.showError('Failed to login due to unknown error');
      }
    }
  };

  return (
    <Paper className={classes.paper}>
      <PageContentArea>
        <CenterLayout>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>
                  Email address:
                  <RequiredStar />
                </Form.Label>
                <Form.Control
                  onChange={setUsername}
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>
                  Password:
                  <RequiredStar />
                </Form.Label>
                <Form.Control
                  onChange={setPassword}
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
    </Paper>
  );
}

export default Login;
