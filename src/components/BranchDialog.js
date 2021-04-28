import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useEVCheckedState } from '../hooks/useEVCheckedState';
import { useEVValueState } from '../hooks/useEVValueState';
import { useBranchStore } from '../store/BranchStore';
import { useUserStore } from '../store/UserStore';
import {
  notEmptyValidation,
  contactValidation,
  emailValidation,
} from '../validation/form-validation';
import DialogWindow from './DialogWindow';
import BranchAPI from '../api/BranchAPI';

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

const BranchDialog = ({ edit, branch, role, ...args }) => {
  if (edit && !branch) throw new Error('Edit window require branch details');

  branch = branch || getBranchJson(role);

  const branchStore = useBranchStore();
  const [location, setLocation] = useEVValueState(branch.location);
  const [address, setAddress] = useEVValueState(branch.address);
  const [contact, setContact] = useEVValueState(branch.contact);
  const [email, setEmail] = useEVValueState(branch.email);
  const [active, setActive] = useEVCheckedState(branch.active);

  const classes = useStyles();

  const [errors, setErrors] = useState({
    location: {},
    address: {},
    contact: {},
    email: {},
  });

  useEffect(() => {
    setErrors({
      location: notEmptyValidation(location),
      address: notEmptyValidation(address),
      contact: contactValidation(contact),
      email: emailValidation(email),
    });
  }, [address, contact, email, location]);

  const hasErrors = () => {
    return Object.entries(errors).some(([_key, value]) => value.error);
  };

  const userStore = useUserStore();
  const branchAPI = new BranchAPI(userStore.role);

  const handleSave = () => {
    const now = new Date();
    (async () => {
      const newBranch = {
        ...branch,
        location,
        contact,
        address,
        email,
        active,
        createdDate: now,
      };

      edit
        ? await branchAPI.updateBranch(newBranch)
        : await branchAPI.createBranch(newBranch);
      await branchStore.refreshData();
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
    <DialogWindow ActionBar={ActionBar} title="Edit Branch" {...args}>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <TextField
            onChange={setLocation}
            error={errors.location.error}
            helperText={errors.location.helpText}
            required
            label="Location"
            defaultValue={location}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            required
            onChange={setContact}
            error={errors.contact.error}
            helperText={errors.contact.helpText}
            label="Contact"
            defaultValue={contact}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            required
            onChange={setEmail}
            error={errors.email.error}
            helperText={errors.email.helpText}
            label="Email"
            defaultValue={email}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            required
            onChange={setAddress}
            error={errors.address.error}
            helperText={errors.address.helpText}
            label="Address"
            defaultValue={address}
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

const getBranchJson = () => {
  const now = new Date().toISOString();

  return {
    id: 0,
    location: '',
    contact: '',
    address: '',
    email: '',
    active: true,
    createdDate: now,
  };
};

export default BranchDialog;
