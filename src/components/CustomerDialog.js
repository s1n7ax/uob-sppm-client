import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useEVCheckedState } from '../hooks/useEVCheckedState';
import { useEVValueState } from '../hooks/useEVValueState';
import { useCustomerStore } from '../store/CustomerStore';
import { useUserStore } from '../store/UserStore';
import {
  usernameValidation,
  passwordValidation,
  nameValidation,
} from '../validation/form-validation';
import DialogWindow from './DialogWindow';
import CustomerAPI from '../api/CustomerAPI';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  formControlSingle: {
    margin: theme.spacing(1),
    minWidth: 250,
    marginRight: 50,
  },
}));

const CustomerDialog = ({ edit, customer, role, ...args }) => {
  if (edit && !customer)
    throw new Error('Edit window require customer details');

  customer = customer || getCustomerJson(role);

  const customerStore = useCustomerStore();
  const [username, setUsername] = useEVValueState(customer.user.username);
  const [password, setPassword] = useState(customer.user.password);
  const [firstName, setFirstName] = useEVValueState(customer.user.firstName);
  const [lastName, setLastName] = useEVValueState(customer.user.lastName);
  const [active, setActive] = useEVCheckedState(customer.user.active);

  const classes = useStyles();

  const [errors, setErrors] = useState({
    username: {},
    password: {},
    firstName: {},
    lastName: {},
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setErrors({
      username: usernameValidation(username),
      password:
        edit && !password
          ? { error: false, helpText: '' }
          : passwordValidation(password),
      firstName: nameValidation(firstName),
      lastName: nameValidation(lastName),
    });
  }, [
    username,
    password,
    firstName,
    lastName,
    edit,
    customer.user.username,
    customer.user.password,
    customer.user.firstName,
    customer.user.lastName,
  ]);

  const hasErrors = () => {
    return Object.entries(errors).some(([_key, value]) => value.error);
  };

  const userStore = useUserStore();
  const customerAPI = new CustomerAPI(userStore.role);

  const handleSave = () => {
    (async () => {
      const updatedCustomer = {
        ...customer,
        user: {
          ...customer.user,
          username,
          password,
          firstName,
          lastName,
          active,
        },
      };

      edit
        ? await customerAPI.updateCustomer(updatedCustomer)
        : await customerAPI.createCustomer(updatedCustomer);
      await customerStore.refreshData();
      args.closeWindow();
    })();
  };

  const ActionBar = () => {
    return (
      <Button disabled={hasErrors()} onClick={handleSave} color="primary">
        Save changes
      </Button>
    );
  };

  return (
    <DialogWindow ActionBar={ActionBar} title="Edit Customer" {...args}>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <TextField
            key="username"
            onChange={setUsername}
            error={errors.username.error}
            helperText={errors.username.helpText}
            required
            label="Username"
            defaultValue={username}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel
            error={edit && !password ? false : errors.password.error}
            htmlFor="password"
          >
            Password
          </InputLabel>
          <Input
            required
            id="password"
            error={edit && !password ? false : errors.password.error}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            error={edit && !password ? false : errors.password.error}
          >
            {edit && !password ? false : errors.password.helpText}
          </FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            required
            onChange={setFirstName}
            error={errors.firstName.error}
            helperText={errors.firstName.helpText}
            label="First Name"
            defaultValue={firstName}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            required
            onChange={setLastName}
            error={errors.lastName.error}
            helperText={errors.lastName.helpText}
            label="Last Name"
            defaultValue={lastName}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            disabled
            label="Role"
            defaultValue={customer.user.roles[0].name}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <FormControlLabel
            control={
              <Checkbox onChange={setActive} checked={active} name="Active" />
            }
            label="Active"
          />
        </FormControl>
      </form>
    </DialogWindow>
  );
};

const getCustomerJson = (role) => {
  const now = new Date().toISOString();

  return {
    id: 0,
    user: {
      id: 0,
      roles: [role],
      username: '',
      firstName: '',
      lastName: '',
      active: true,
      lastLogin: now,
      createdDate: now,
    },
  };
};

export default CustomerDialog;
