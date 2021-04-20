import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import LineChart from './Chart';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getDailySales, getBranchSales } from '../api/organization';
import TableOfContent from './TableOfContent2';
import { VictoryPie } from 'victory';
import Snackbar from './Snackbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  datePickerPaper: {
    padding: theme.spacing(2),
  },
  pieChartPaper: {
    height: 400,
    padding: theme.spacing(2),
  },
}));

const Sales = () => {
  const classes = useStyles();
  const [chartData, setCharData] = useState([]);
  const [pieChartData, setPieCharData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [snackbarOpened, setSnakbarOpened] = useState(false);
  const [snackbarMessage, setSnakbarMessage] = useState('');

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const getYMD = (dateStr) => {
    let date = new Date(dateStr);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  };

  const createRow = (branchSale) => {
    return {
      branch: branchSale.branch.location,
      date: getYMD(branchSale.date),
      amount: branchSale.amount,
    };
  };

  const calculatePieChartData = (branchSales) => {
    const branchSalesMap = {};

    branchSales
      .map((i) => ({ branch: i.branch.location, amount: i.amount }))
      .forEach((i) => {
        if (!branchSalesMap[i.branch]) branchSalesMap[i.branch] = 0;

        branchSalesMap[i.branch] += i.amount;
      });

    const entries = Object.entries(branchSalesMap);

    const tot = entries
      .map(([_branch, amount]) => amount)
      .reduce((acc, curr) => acc + curr, 0);

    return entries.map(([branch, amount]) => ({
      x: branch,
      y: (amount / tot) * 100,
    }));
  };

  useEffect(() => {
    const asyncCall = async () => {
      const [dailySales, branchSales] = await Promise.all([
        getDailySales(fromDate, toDate),
        getBranchSales(fromDate, toDate),
      ]);

      setCharData(
        dailySales.map((i) => ({
          time: getYMD(i.date),
          amount: i.amount,
        }))
      );

      setTableRows(branchSales.map((i) => createRow(i)));

      setPieCharData(calculatePieChartData(branchSales));
    };

    asyncCall();
  }, [fromDate, toDate]);

  const showSnakbarMessage = (message) => {
    setSnakbarOpened(true);
    setSnakbarMessage(message);
  };

  const handleFromDateChange = (date) => {
    if (date > toDate) setToDate(date);

    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    if (fromDate > date) {
      showSnakbarMessage("To date shouldn't be greater than from date");
      return;
    }

    setToDate(date);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.datePickerPaper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container align="center" spacing={3}>
                <Grid item xs={12} md={8} lg={6}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="From Date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'set from date',
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="To date"
                    value={toDate}
                    onChange={handleToDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'set to date',
                    }}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <LineChart title="Daily Income" data={chartData} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.pieChartPaper}>
            <Typography variant="h6">Branch Income</Typography>
            <VictoryPie
              colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
              animate={{
                duration: 1000,
              }}
              data={pieChartData}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <TableOfContent
              title="Branch Daily Income"
              headers={headers}
              rows={tableRows}
              keyName="branch"
              selection={false}
            />
          </Paper>
        </Grid>
      </Grid>
      {snackbarOpened && (
        <Snackbar
          opened={snackbarOpened}
          message={snackbarMessage}
          onClose={() => setSnakbarOpened(false)}
        />
      )}
    </>
  );
};

const headers = [
  { id: 'branch', numeric: false, disablePadding: false, label: 'Branch' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'amount' },
];

export default Sales;
