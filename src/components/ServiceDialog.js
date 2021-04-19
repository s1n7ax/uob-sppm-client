import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { updateService, createService } from '../api/organization';
import { useEVCheckedState } from '../hooks/useEVCheckedState';
import { useEVValueState } from '../hooks/useEVValueState';
import { useServiceStore } from '../store/ServiceStore';
import { notEmptyValidation } from '../validation/form-validation';
import DialogWindow from './DialogWindow';

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

const ServiceDialog = ({ edit, pkg, role, ...args }) => {
  if (edit && !pkg) throw new Error('Edit window require service details');

  pkg = pkg || getServiceJson(role);

  const serviceStore = useServiceStore();
  console.log(pkg.description);

  const [name, setName] = useEVValueState(pkg.name);
  const [amount, setAmount] = useEVValueState(pkg.amount);
  const [description, setDescription] = useEVValueState(pkg.description);
  const [allocatedHours, setAllocatedHours] = useEVValueState(
    pkg.allocatedHours
  );
  const [active, setActive] = useEVCheckedState(pkg.active);

  const classes = useStyles();

  const [errors, setErrors] = useState({
    name: {},
    amount: {},
    description: {},
    image: {},
    allocatedHours: {},
  });

  useEffect(() => {
    setErrors({
      name: notEmptyValidation(name),
      amount: amountValidation(amount),
      description: notEmptyValidation(description),
      allocatedHours: allocatedHourValidation(allocatedHours),
    });
  }, [allocatedHours, amount, description, name]);

  const hasErrors = () => {
    return Object.entries(errors).some(([_key, value]) => value.error);
  };

  const handleSave = () => {
    const now = new Date();

    (async () => {
      const newService = {
        ...pkg,
        name,
        amount: Number(amount),
        description,
        allocatedHours: Number(allocatedHours),
        active,
        createdDate: now,
      };

      edit ? await updateService(newService) : await createService(newService);
      await serviceStore.refreshData();
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
    <DialogWindow ActionBar={ActionBar} title="Edit Service" {...args}>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <TextField
            onChange={setName}
            error={errors.name.error}
            helperText={errors.name.helpText}
            required
            label="Name"
            defaultValue={name}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            required
            onChange={setAmount}
            error={errors.amount.error}
            helperText={errors.amount.helpText}
            label="Amount"
            defaultValue={amount}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            required
            onChange={setDescription}
            error={errors.description.error}
            helperText={errors.description.helpText}
            label="Description"
            defaultValue={description}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            required
            onChange={setAllocatedHours}
            error={errors.allocatedHours.error}
            helperText={errors.allocatedHours.helpText}
            label="Allocated Hours"
            defaultValue={allocatedHours}
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

const getServiceJson = () => {
  return {
    id: 0,
    name: '',
    amount: '',
    active: true,
    description: '',
    image: '',
    allocatedHours: '',
    createdDate: new Date(),
  };
};

const allocatedHourValidation = (value) => {
  const int = Number(value);
  let error = false;
  let helpText = '';

  if (value.length === 0) {
    error = true;
    helpText = "Allocated Hours shouldn't be empty";
  } else if (isNaN(int)) {
    error = true;
    helpText = 'Only numbers are allowed';
  } else if (int > 24) {
    error = true;
    helpText = "Allocated Hours shouldn't be longer than 24h";
  }

  console.log(error, helpText);

  return { error, helpText };
};

const amountValidation = (value) => {
  const num = Number(value);
  let error = false;
  let helpText = '';

  if (value.length === 0) {
    error = true;
    helpText = "Amount shouldn't be empty";
  } else if (isNaN(num)) {
    error = true;
    helpText = 'Amount should be number';
  }

  return { error, helpText };
};

export default ServiceDialog;
