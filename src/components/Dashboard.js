import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import TodayIncome from './TodayIncomeCard';
import Orders from './Orders';
import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getTodaySales } from '../api/organization';

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
}));

const Dashboard = () => {
  const classes = useStyles();
  const [totalIncome, setTotalIncome] = useState(0);
  const [chartData, setCharData] = useState([]);
  const [branchIncomes, setBranchIncomes] = useState([]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const calTotalReducer = (acc, curr) => acc + curr;
  const getAmountMap = (item) => item.amount;
  const getHMTime = (dateStr) => {
    let date = new Date(dateStr);
    return date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  useEffect(() => {
    (async () => {
      let sales = await getTodaySales();
      let totalIncome = 0;
      let chartData = [];
      let branchIncomes = {};

      sales.forEach((sale) => {
        let saleTotal = 0;
        saleTotal += sale.service.map(getAmountMap).reduce(calTotalReducer, 0);
        saleTotal += sale.packages.map(getAmountMap).reduce(calTotalReducer, 0);

        totalIncome += saleTotal;
        chartData.push({
          time: getHMTime(sale.createdDate),
          amount: saleTotal,
        });

        let branchName = sale.branch.location;
        let contact = sale.branch.contact;
        let amount = saleTotal;

        let currBranch = branchIncomes[branchName];

        currBranch = currBranch || {};
        currBranch.name = branchName;
        currBranch.contact = contact;
        currBranch.amount = (currBranch.amount || 0) + amount;

        branchIncomes[branchName] = currBranch;
      }, []);

      setTotalIncome(totalIncome);
      setCharData(chartData);
      setBranchIncomes(
        Object.entries(branchIncomes).map(([_, value]) => {
          return value;
        })
      );
    })();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart data={chartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <TodayIncome income={totalIncome} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <Orders rows={branchIncomes} />
          </Paper>
        </Grid>
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Dashboard;
