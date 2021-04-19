import TableOfContent from './TableOfContent2';
import { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EmployeeDialog from './EmployeeDialog';
import { useEmployeeStore } from '../store/EmployeeStore';
import { useRoleStore } from '../store/RoleStore';
import { useBranchStore } from '../store/BranchStore';
import { useObserver } from 'mobx-react-lite';
import AcceptDialog from './AcceptDialog';
import { updateEmployee } from '../api/organization';

const EmployeeManagement = () => {
  const empStore = useEmployeeStore();

  const createRow = (emp) => {
    return {
      id: emp.id,
      name: `${emp.user.firstName} ${emp.user.lastName}`,
      username: emp.user.username,
      active: emp.user.active.toString(),
      branch: emp.branch.location,
    };
  };

  return useObserver(() => (
    <>
      <TableOfContent
        title="Employees"
        headers={headers}
        rows={empStore.employees.map((emp) => createRow(emp))}
        keyName="id"
        ActionBar={ActionBar}
      />
    </>
  ));
};

const ActionBar = ({ selected }) => {
  const empStore = useEmployeeStore();

  const selectedItemsData = selected.map((id) => empStore.find(id));
  const selectedCount = selected.length;
  const actions = [];

  if (selectedCount === 1) {
    actions.push(
      <EmployeeEditAction key="edit_action" employee={selectedItemsData[0]} />
    );
  }

  if (selectedCount > 0) {
    actions.push(
      <EmployeeChangeActiveAction
        activate={false}
        key="deactivate_action"
        employees={selectedItemsData}
      />
    );
    actions.push(
      <EmployeeChangeActiveAction
        activate={true}
        key="activate_action"
        employees={selectedItemsData}
      />
    );
  }

  actions.push(<EmployeeCreateAction key="create_action" />);

  return <>{actions}</>;
};

const headers = [
  { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'active', numeric: false, disablePadding: false, label: 'Active' },
  { id: 'branch', numeric: false, disablePadding: false, label: 'Branch' },
];

const EmployeeEditAction = ({ employee }) => {
  const roleStore = useRoleStore();
  const branchStore = useBranchStore();

  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => setOpened(true)} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <EmployeeDialog
          edit={true}
          employee={employee}
          branchList={branchStore.branches}
          roleList={roleStore.roles.filter((role) => role.name !== 'CUSTOMER')}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const EmployeeCreateAction = () => {
  const roleStore = useRoleStore();
  const branchStore = useBranchStore();

  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Create">
        <IconButton onClick={() => setOpened(true)} aria-label="create">
          <AddIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <EmployeeDialog
          edit={false}
          branchList={branchStore.branches}
          roleList={roleStore.roles}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const EmployeeChangeActiveAction = ({ employees, activate = false }) => {
  const employeeStore = useEmployeeStore();
  const [opened, setOpened] = useState(false);

  const handleAccept = async () => {
    await Promise.all(
      employees.map(async (emp) => {
        await updateEmployee({
          ...emp,
          user: { ...emp.user, active: activate },
        });
      })
    );

    setOpened(false);
    employeeStore.refreshData();
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
          title="Deactivate Employee"
          description={
            <div>
              <span>{`Do you want to deactivate following employees?`}</span>
              <ul>
                {employees.map((emp) => (
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

export default EmployeeManagement;
