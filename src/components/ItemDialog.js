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
import { useItemStore } from '../store/ItemStore';
import { notEmptyValidation } from '../validation/form-validation';
import DialogWindow from './DialogWindow';
import ItemAPI from '../api/ItemAPI';
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

const ItemDialog = ({ edit, item, role, ...args }) => {
  if (edit && !item) throw new Error('Edit window require item details');

  item = item || getItemJson(role);

  const itemStore = useItemStore();
  const userStore = useUserStore();
  const itemAPI = new ItemAPI(userStore.role);

  const [name, setName] = useEVValueState(item.name);
  const [description, setDescription] = useEVValueState(item.description);
  const [active, setActive] = useEVCheckedState(item.active);

  const classes = useStyles();

  const [errors, setErrors] = useState({
    name: {},
    description: {},
  });

  useEffect(() => {
    setErrors({
      name: notEmptyValidation(name),
      description: notEmptyValidation(description),
    });
  }, [description, name]);

  const hasErrors = () => {
    return Object.entries(errors).some(([_key, value]) => value.error);
  };

  const handleSave = () => {
    const now = new Date();

    (async () => {
      const newItem = {
        ...item,
        name,
        description,
        active,
        createdDate: now,
      };

      edit
        ? await itemAPI.updateItem(newItem)
        : await itemAPI.createItem(newItem);
      await itemStore.refreshData();
      args.closeWindow();
    })();
  };

  const ActionBar = () => {
    return (
      <Button disabled={hasErrors()} onClick={handleSave} color="secondary">
        Save changes
      </Button>
    );
  };

  return (
    <DialogWindow ActionBar={ActionBar} title="Edit Item" {...args}>
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
            onChange={setDescription}
            error={errors.description.error}
            helperText={errors.description.helpText}
            label="Description"
            defaultValue={description}
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

const getItemJson = () => {
  return {
    id: 0,
    name: '',
    description: '',
    active: true,
    createdDate: new Date(),
  };
};

export default ItemDialog;
