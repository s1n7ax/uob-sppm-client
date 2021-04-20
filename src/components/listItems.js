import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import CategoryIcon from '@material-ui/icons/Category';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/UserStore';

const adminList = [
  {
    text: 'Dashboard',
    url: '/app/dashboard',
    icon: <DashboardIcon />,
  },
  {
    text: 'User Management',
    url: '/app/user_management',
    icon: <PersonAddIcon />,
  },
  {
    text: 'Stock',
    url: '/app/stock',
    icon: <AddToPhotosIcon />,
  },
  {
    text: 'Sales',
    url: '/app/sales',
    icon: <BarChartIcon />,
  },
  {
    text: 'Items',
    url: '/app/item_management',
    icon: <PlaylistAddIcon />,
  },
  {
    text: 'Branches',
    url: '/app/branches',
    icon: <DeviceHubIcon />,
  },
  {
    text: 'Packages',
    url: '/app/packages',
    icon: <FeaturedPlayListIcon />,
  },
  {
    text: 'Services',
    url: '/app/services',
    icon: <CategoryIcon />,
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

const createList = (list, onChange) => {
  return (
    <div>
      {list.map((item) => {
        return (
          <Link key={item.text} to={item.url}>
            <ListItem button onClick={() => onChange(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        );
      })}
    </div>
  );
};

const MenuList = ({ onChange }) => {
  const store = useUserStore();

  switch (store.role) {
    case 'admin':
      return createList(adminList, onChange);

    case 'manager':
      return createList(managerList);

    case 'stock':
      return createList(stockList);

    default:
      return <div></div>;
  }
};

export default MenuList;
