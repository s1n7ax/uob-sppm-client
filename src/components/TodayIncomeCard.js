import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function TodayIncome({ income }) {
  income = income || 0;

  const classes = useStyles();

  const getTodayIncome = () => {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
    });

    return formatter.format(income);
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    year: 'numeric',
    month: 'long',
  });

  return (
    <React.Fragment>
      <Title>Today Total Income</Title>
      <Typography component="p" variant="h4">
        {getTodayIncome()}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {`on ${todayStr}`}
      </Typography>
    </React.Fragment>
  );
}
