import { useEffect, useState } from 'react';
import { useServiceStore } from '../store/ServiceStore';
import TableOfContent from './TableOfContent2';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useObserver } from 'mobx-react-lite';
import AcceptDialog from './AcceptDialog';
import ServiceDialog from './ServiceDialog';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useUserStore } from '../store/UserStore';
import ServiceAPI from '../api/ServiceAPI';
import { autorun } from 'mobx';

const Services = () => {
  console.log('services');
  const userStore = useUserStore();
  const serviceStore = useServiceStore();

  const createRow = (pkg) => {
    const { id, name, amount, allocatedHours, active } = pkg;
    return { id, name, amount, allocatedHours, active: String(active) };
  };

  return useObserver(() => (
    <TableOfContent
      title="Services"
      headers={headers}
      rows={serviceStore.services.map((pkg) => createRow(pkg))}
      keyName="id"
      ActionBar={ActionBar}
      selection={userStore.role !== 'CUSTOMER' && userStore.role !== ''}
    />
  ));
};

const ActionBar = ({ selected }) => {
  const userStore = useUserStore();

  const serviceStore = useServiceStore();

  const selectedItemsData = selected.map((id) => serviceStore.find(id));
  const selectedCount = selected.length;
  const [actions, setActions] = useState([]);

  useEffect(
    () =>
      autorun(() => {
        console.log('rendering::services');
        if (userStore.role === 'CUSTOMER' || userStore.role === '') {
          return;
        }

        const actions = [];
        if (selectedCount === 1) {
          actions.push(
            <ServiceEditAction key="edit_action" pkg={selectedItemsData[0]} />
          );
        }

        if (selectedCount > 0) {
          actions.push(
            <ServiceChangeActiveAction
              activate={false}
              key="deactivate_action"
              services={selectedItemsData}
            />
          );

          actions.push(
            <ServiceChangeActiveAction
              activate={true}
              key="activate_action"
              services={selectedItemsData}
            />
          );
        }

        actions.push(<ServiceCreateAction key="create_action" />);
        actions.push(<ServiceRefreshAction key="refresh_action" />);

        setActions(actions);
      }),
    []
  );

  return <>{actions}</>;
};

const headers = [
  { id: 'id', numeric: true, label: 'Id' },
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'amount', numeric: false, label: 'Amount' },
  { id: 'allocatedHours', numeric: false, label: 'Allocated Hours' },
  { id: 'active', numeric: false, label: 'Active' },
];

const ServiceRefreshAction = () => {
  const serviceStore = useServiceStore();

  return (
    <>
      <Tooltip title="Refresh">
        <IconButton
          onClick={() => serviceStore.refreshData()}
          aria-label="refresh"
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
const ServiceCreateAction = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Create">
        <IconButton onClick={() => setOpened(true)} aria-label="create">
          <AddIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <ServiceDialog
          edit={false}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};
const ServiceEditAction = ({ pkg }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => setOpened(true)} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <ServiceDialog
          edit={true}
          pkg={pkg}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const ServiceChangeActiveAction = ({ services, activate = false }) => {
  const userStore = useUserStore();
  const serviceStore = useServiceStore();
  const [opened, setOpened] = useState(false);

  const serviceAPI = new ServiceAPI(userStore.role);

  const handleAccept = async () => {
    await Promise.all(
      services.map(async (pkg) => {
        await serviceAPI.updateService({
          ...pkg,
          active: activate,
        });
      })
    );

    setOpened(false);
    serviceStore.refreshData();
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
              <span>{`Do you want to deactivate following services?`}</span>
              <ul>
                {services.map((pkg) => (
                  <li key={pkg.id}>{`${pkg.name}`}</li>
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

export default Services;
