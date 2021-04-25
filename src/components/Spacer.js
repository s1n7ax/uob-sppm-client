import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  spacer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const Spacer = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.spacer}>{children}</div>;
};

export default Spacer;
