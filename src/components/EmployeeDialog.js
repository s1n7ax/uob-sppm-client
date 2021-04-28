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
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useEVCheckedState } from '../hooks/useEVCheckedState';
import { useEVValueState } from '../hooks/useEVValueState';
import { useBranchStore } from '../store/BranchStore';
import { useEmployeeStore } from '../store/EmployeeStore';
import { useRoleStore } from '../store/RoleStore';
import {
  usernameValidation,
  passwordValidation,
  nameValidation,
  nicValidation,
} from '../validation/form-validation';
import DialogWindow from './DialogWindow';
import EmployeeAPI from '../api/EmployeeAPI';
import { useUserStore } from '../store/UserStore';

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

const EmployeeDialog = ({ edit, employee, branchList, roleList, ...args }) => {
  if (edit && !employee)
    throw new Error('Edit window require the employee data');

  const empStore = useEmployeeStore();
  const roleStore = useRoleStore();
  const branchStore = useBranchStore();

  employee = edit
    ? employee
    : getEmployeeJson(
        branchStore.branches[0],
        roleStore.findByName('EMPLOYEE')
      );

  const [username, setUsername] = useEVValueState(employee.user.username);
  const [password, setPassword] = useState(employee.user.password);
  const [firstName, setFirstName] = useEVValueState(employee.user.firstName);
  const [lastName, setLastName] = useEVValueState(employee.user.lastName);
  const [active, setActive] = useEVCheckedState(employee.user.active);
  const [nic, setNIC] = useEVValueState(employee.nic);
  const [branchId, setBranchId] = useEVValueState(employee.branch.id);
  const [roleId, setRoleId] = useEVValueState(employee.user.roles[0].id);

  const classes = useStyles();

  const [errors, setErrors] = useState({
    username: {},
    password: {},
    firstName: {},
    lastName: {},
    nic: {},
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
      nic: nicValidation(nic),
    });
  }, [
    username,
    password,
    firstName,
    lastName,
    nic,
    edit,
    employee.user.username,
    employee.user.password,
    employee.user.firstName,
    employee.user.lastName,
  ]);

  const hasErrors = () => {
    return Object.entries(errors).some(([_key, value]) => value.error);
  };

  const userStore = useUserStore();
  const employeeAPI = new EmployeeAPI(userStore.role);

  const handleSave = () => {
    (async () => {
      const updatedBranch = branchStore.find(branchId);
      const updatedRole = roleStore.find(roleId);

      const updatedEmp = {
        ...employee,
        nic,
        user: {
          ...employee.user,
          username,
          password,
          firstName,
          lastName,
          active,
          roles: [updatedRole],
        },
        branch: updatedBranch,
      };

      edit
        ? await employeeAPI.updateEmployee(updatedEmp)
        : await employeeAPI.createEmployee(updatedEmp);
      await empStore.refreshData();
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
    <DialogWindow ActionBar={ActionBar} title="Edit Employee" {...args}>
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

        <FormControl className={classes.formControlSingle}>
          <TextField
            required
            onChange={setNIC}
            error={errors.nic.error}
            helperText={errors.nic.helpText}
            label="NIC"
            defaultValue={nic}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Branch</InputLabel>
          <Select onChange={setBranchId} value={branchId}>
            {branchList.map((branch) => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Role</InputLabel>
          <Select onChange={setRoleId} value={roleId}>
            {roleList.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
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

const getEmployeeJson = (branch, role) => {
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
    branch,
    nic: '',
  };
};

export default EmployeeDialog;
