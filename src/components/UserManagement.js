import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EmployeeManagement from './EmployeeManagement';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const UserManagement = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function createData(name, username, active, branch) {
    return { name, username, active: active.toString(), branch };
  }

  const rows = [
    createData('Srinesh Nisala', 'nisaal@gmail.com', true, 'Nugegoda'),
    createData('Test sample', 'test@gmail.com', true, 'Nugegoda'),
    createData('Sample', 'sample@gmail.comdf', true, 'Nugegoda'),
    createData('Srinesh Nisala', 'nisaal@gmail.comsdf', true, 'Nugegoda'),
    createData('Test sample', 'test@gmail.comdf', true, 'Nugegoda'),
    createData('Sample', 'sample@gmail.comfaa', true, 'Nugegoda'),
    createData('Srinesh Nisala', 'nisaal@gmdail.com', true, 'Nugegoda'),
    createData('Test sample', 'test@gmfail.com', true, 'Nugegoda'),
    createData('Sample', 'sample@gmaidl.com', true, 'Nugegoda'),
    createData('Srinesh Nisala', 'nisaal@gmail.com', true, 'Nugegoda'),
    createData('Test sample', 'test@dsgmail.com', true, 'Nugegoda'),
    createData('Sample', 'samples@gmail.com', true, 'Nugegoda'),
    createData('Srinesh Nisala', 'nisadal@gmail.com', true, 'Nugegoda'),
    createData('Test sample', 'test@dgmail.com', true, 'Nugegoda'),
    createData('Sample', 'samplfe@gmail.com', true, 'Nugegoda'),
    createData('Srinesh Nisala', 'nisaaal@gmail.com', true, 'Nugegoda'),
    createData('Test sample', 'test@gbmail.com', true, 'Nugegoda'),
    createData('Sample', 'samaple@gmail.com', true, 'Nugegoda'),
    createData('Srinesh Nisala', 'nissaal@gmail.com', true, 'Nugegoda'),
    createData('Test sample', 'test@ddgmail.com', true, 'Nugegoda'),
    createData('Sample', 'sampled@gmail.com', true, 'Nugegoda'),
    createData('Srinesh Nisala', 'nisaaxl@gmail.com', true, 'Nugegoda'),
    createData('Test sample', 'testsaa@gmail.com', true, 'Nugegoda'),
    createData('Sample', 'sample@gssmail.com', true, 'Nugegoda'),
  ];

  const headers = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    {
      id: 'username',
      numeric: false,
      disablePadding: false,
      label: 'Username',
    },
    { id: 'active', numeric: false, disablePadding: false, label: 'Active' },
    { id: 'branch', numeric: false, disablePadding: false, label: 'Branch' },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Staff" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EmployeeManagement />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
};

export default UserManagement;
