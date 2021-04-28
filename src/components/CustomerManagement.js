import TableOfContent from './TableOfContent2';
import { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CustomerDialog from './CustomerDialog';
import { useCustomerStore } from '../store/CustomerStore';
import { useRoleStore } from '../store/RoleStore';
import { useObserver } from 'mobx-react-lite';
import AcceptDialog from './AcceptDialog';
import { useUserStore } from '../store/UserStore';
import CustomerAPI from '../api/CustomerAPI';

const CustomerManagement = () => {
  const customerStore = useCustomerStore();

  const createRow = (customer) => {
    return {
      id: customer.id,
      name: `${customer.user.firstName} ${customer.user.lastName}`,
      username: customer.user.username,
      active: customer.user.active.toString(),
    };
  };

  return useObserver(() => (
    <>
      <TableOfContent
        title="Customers"
        headers={headers}
        rows={customerStore.customers.map((emp) => createRow(emp))}
        keyName="id"
        ActionBar={ActionBar}
      />
    </>
  ));
};

const ActionBar = ({ selected }) => {
  const customerStore = useCustomerStore();

  const selectedItemsData = selected.map((id) => customerStore.find(id));
  const selectedCount = selected.length;
  const actions = [];

  if (selectedCount === 1) {
    actions.push(
      <CustomerEditAction key="edit_action" customer={selectedItemsData[0]} />
    );
  }

  if (selectedCount > 0) {
    actions.push(
      <CustomerChangeActiveAction
        activate={false}
        key="deactivate_action"
        customers={selectedItemsData}
      />
    );
    actions.push(
      <CustomerChangeActiveAction
        activate={true}
        key="activate_action"
        customers={selectedItemsData}
      />
    );
  }

  actions.push(<CustomerCreateAction key="create_action" />);

  return <>{actions}</>;
};

const headers = [
  { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'active', numeric: false, disablePadding: false, label: 'Active' },
];

const CustomerEditAction = ({ customer }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => setOpened(true)} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <CustomerDialog
          edit={true}
          customer={customer}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const CustomerCreateAction = () => {
  const [opened, setOpened] = useState(false);
  const roleStore = useRoleStore();

  return (
    <>
      <Tooltip title="Create">
        <IconButton onClick={() => setOpened(true)} aria-label="create">
          <AddIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <CustomerDialog
          role={roleStore.findByName('CUSTOMER')}
          edit={false}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const CustomerChangeActiveAction = ({ customers, activate = false }) => {
  const customerStore = useCustomerStore();
  const userStore = useUserStore();
  const customerAPI = new CustomerAPI(userStore.role);
  const [opened, setOpened] = useState(false);

  const handleAccept = async () => {
    await Promise.all(
      customers.map(async (emp) => {
        await customerAPI.updateCustomer({
          ...emp,
          user: { ...emp.user, active: activate },
        });
      })
    );

    setOpened(false);
    customerStore.refreshData();
  };

  return (
    <>
      <Tooltip title={activate ? 'Activate' : 'Deactivate'}>
        <IconButton
          onClick={() => setOpened(true)}
          aria-label="activate or deactivate"
        >
          {activate ? <CheckCircleIcon /> : <RemoveCircleIcon />}
        </IconButton>
      </Tooltip>

      {opened && (
        <AcceptDialog
          opened={opened}
          title="Deactivate Customer"
          description={
            <div>
              <span>{`Do you want to deactivate following customers?`}</span>
              <ul>
                {customers.map((emp) => (
                  <li key={emp.id}>
                    {`${emp.user.firstName} ${emp.user.lastName}`}
                  </li>
                ))}
              </ul>
            </div>
          }
          handleAccept={handleAccept}
          handleClose={() => setOpened(false)}
          warning={true}
        />
      )}
    </>
  );
};

export default CustomerManagement;
