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
import { useEVCheckedState } from '../hooks/useEVCheckedState';
import { useEVValueState } from '../hooks/useEVValueState';
import DialogWindow from './DialogWindow';
import StockItemAPI from '../api/StockItemAPI';
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
  const [branchId, setBranchId] = useEVValueState(branchList[0].id);
  const [itemId, setItemId] = useEVValueState(itemList[0].id);
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

  const userStore = useUserStore();
  const stockItemAPI = new StockItemAPI(userStore.role);

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
        ? await stockItemAPI.updateStockItem(newStockItem)
        : await stockItemAPI.createStockItem(newStockItem);

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
          <Select onChange={setBranchId} defaultValue={branchId}>
            {branchList.map((branch) => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Item</InputLabel>
          <Select onChange={setItemId} defaultValue={itemId}>
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
    active: true,
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
