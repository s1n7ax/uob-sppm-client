import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { updateStockItem, createStockItem } from '../api/organization';
import { useEVCheckedState } from '../hooks/useEVCheckedState';
import { useEVValueState } from '../hooks/useEVValueState';
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

const StockItemDialog = ({
  branchList,
  itemList,
  edit,
  stock,
  role,
  onUpdate,
  ...args
}) => {
  if (edit && !stock) throw new Error('Edit window require stockItem details');

  stock = stock || getStockItemJson(role);

  const [count, setCount] = useEVValueState(stock.count);
  const [branchId, setBranchId] = useEVValueState(stock.branch.id);
  const [itemId, setItemId] = useEVValueState(stock.item.id);
  const [active, setActive] = useEVCheckedState(stock.active);

  const classes = useStyles();

  const [errors, setErrors] = useState({
    count: {},
  });

  useEffect(() => {
    setErrors({
      count: countValidation(count),
    });
  }, [count]);

  const hasErrors = () => {
    return Object.entries(errors).some(([_key, value]) => value.error);
  };

  const handleSave = () => {
    (async () => {
      const newStockItem = {
        ...stock,
        count,
        active,
        branch: branchList.find((branch) => branch.id === branchId),
        item: itemList.find((item) => item.id === itemId),
      };

      edit
        ? await updateStockItem(newStockItem)
        : await createStockItem(newStockItem);

      onUpdate();
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
    <DialogWindow ActionBar={ActionBar} title="Edit StockItem" {...args}>
      <form className={classes.root} noValidate autoComplete="off">
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
          <InputLabel>Item</InputLabel>
          <Select onChange={setItemId} value={itemId}>
            {itemList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            required
            onChange={setCount}
            error={errors.count.error}
            helperText={errors.count.helpText}
            label="Count"
            defaultValue={count}
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

const getStockItemJson = () => {
  return {
    id: 0,
    branch: {},
    item: {},
    count: 0,
    createdDate: new Date(),
  };
};

const countValidation = (value) => {
  const int = Number(value);
  let error = false;
  let helpText = '';

  if (value.length === 0) {
    error = true;
    helpText = "Allocated Hours shouldn't be empty";
  } else if (isNaN(int)) {
    error = true;
    helpText = 'Only numbers are allowed';
  }

  return { error, helpText };
};

export default StockItemDialog;
