import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/UserStore';

const adminList = [
  {
    text: 'Dashboard',
    url: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    text: 'User Management',
    url: '/user_management',
    icon: <ShoppingCartIcon />,
  },
  {
    text: 'Stock',
    url: '/stock',
    icon: <PeopleIcon />,
  },
  {
    text: 'Sales',
    url: '/sales',
    icon: <BarChartIcon />,
  },
  {
    text: 'Branch',
    url: '/branch',
    icon: <LayersIcon />,
  },
  {
    text: 'Package',
    url: '/package',
    icon: <LayersIcon />,
  },
  {
    text: 'Service',
    url: '/service',
    icon: <LayersIcon />,
  },
];

const managerList = [
  {
    text: 'Dashboard',
    url: '/dashboard',
    icon: <PeopleIcon />,
  },
  {
    text: 'Stock',
    url: '/stock',
    icon: <PeopleIcon />,
  },
  {
    text: 'Customer Booking',
    url: '/customer_booking',
    icon: <PeopleIcon />,
  },
];

const stockList = [
  {
    text: 'Dashboard',
    url: '/dashboard',
    icon: <PeopleIcon />,
  },
  {
    text: 'Stock',
    url: '/stock',
    icon: <PeopleIcon />,
  },
];

const createList = (list) => {
  return (
    <div>
      {list.map((item, index) => {
        return (
          <Link key={index} to={item.url}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        );
      })}
    </div>
  );
};

const MenuList = () => {
  const store = useUserStore();

  switch (store.role) {
    case 'admin':
      return createList(adminList);

    case 'manager':
      return createList(managerList);

    case 'stock':
      return createList(stockList);

    default:
      return <div></div>;
  }
};

export default MenuList;
