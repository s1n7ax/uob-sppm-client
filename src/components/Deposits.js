import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { useUserStore } from '../store/UserStore';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const user = useUserStore();

  const getTodayIncome = () => {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
    });

    return formatter.format(3024);
  };

  return (
    <React.Fragment>
      <Title>Today Total Income</Title>
      <Typography component="p" variant="h4">
        {getTodayIncome()}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
