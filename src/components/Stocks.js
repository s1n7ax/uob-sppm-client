import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import {
  getAllInStock,
  getAllOutOfStock,
  getAllInStockByBranch,
  getAllOutOfStockByBranch,
} from '../api/organization';
import { useUserStore } from '../store/UserStore';
import { useBranchStore } from '../store/BranchStore';
import { useEVValueState } from '../hooks/useEVValueState';
import { useObserver } from 'mobx-react-lite';
import StockTableOfContent from './StockTableOfContent';

const useStyles = makeStyles((theme) => ({
  datePickerPaper: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
}));

const Stocks = () => {
  // stores
  const userStore = useUserStore();
  const branchStore = useBranchStore();

  const [branchId, setBranchId] = useEVValueState(-1);
  const [inStockItems, setInStockItems] = useState([]);
  const [outOfStockItems, setOutOfStockItems] = useState([]);

  // styles
  const classes = useStyles();

  const updateStockItems = async () => {
    let inStockAPI;
    let outOfStockAPI;

    if (branchId === -1) {
      inStockAPI = getAllInStock;
      outOfStockAPI = getAllOutOfStock;
    } else {
      inStockAPI = () => getAllInStockByBranch(branchId);
      outOfStockAPI = () => getAllOutOfStockByBranch(branchId);
    }

    const [inStockItemsTemp, outOfStockItemsTemp] = await Promise.all([
      inStockAPI(),
      outOfStockAPI(),
    ]);

    setInStockItems(inStockItemsTemp);
    setOutOfStockItems(outOfStockItemsTemp);
  };

  useEffect(() => {
    updateStockItems();
  }, [branchId]);

  const handleStockItemChange = () => {
    updateStockItems();
  };

  return useObserver(() => (
    <>
      <Grid container spacing={3}>
        {userStore.role === 'admin' && (
          <Grid item xs={12}>
            <Paper className={classes.datePickerPaper}>
              <FormControl className={classes.formControl}>
                <InputLabel>Branch</InputLabel>
                <Select onChange={setBranchId} value={branchId}>
                  <MenuItem value={-1}>All</MenuItem>
                  {branchStore.branches.map((branch) => (
                    <MenuItem key={branch.id} value={branch.id}>
                      {branch.location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        )}
        <Grid item xs={12}>
          <Paper>
            <StockTableOfContent
              title="Out Of Stock Items"
              stocks={outOfStockItems}
              onUpdate={handleStockItemChange}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <StockTableOfContent
              title="In Stock Items"
              stocks={inStockItems}
              onUpdate={handleStockItemChange}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  ));
};

export default Stocks;
