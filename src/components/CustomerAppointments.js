import { useState } from 'react';
import { useCustomerAppointmentStore } from '../store/CustomerAppointmentStore';
import TableOfContent from './TableOfContent2';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useObserver } from 'mobx-react-lite';
import AcceptDialog from './AcceptDialog';
import { updateCustomerAppointment } from '../api/organization';
import CustomerAppointmentDialog from './CustomerAppointmentDialog';
import RefreshIcon from '@material-ui/icons/Refresh';
import differenceInHours from 'date-fns/differenceInHours';
import format from 'date-fns/format';
import { useBranchStore } from '../store/BranchStore';
import { useServiceStore } from '../store/ServiceStore';
import { usePackageStore } from '../store/PackageStore';

const Appointments = () => {
  const appointmentStore = useCustomerAppointmentStore();

  const createRow = (app) => {
    const { id, branch, timeStart, timeEnd, completed, active } = app;

    const duration = differenceInHours(new Date(timeEnd), new Date(timeStart));

    return {
      id,
      branch: branch.location,
      time: format(new Date(timeStart), "P' 'p"),
      duration,
      completed: String(completed),
      canceled: String(!active),
    };
  };

  return useObserver(() => (
    <TableOfContent
      title="Appointments"
      headers={headers}
      rows={appointmentStore.appointments.map((app) => createRow(app))}
      keyName="id"
      ActionBar={ActionBar}
    />
  ));
};

const ActionBar = ({ selected }) => {
  const appointmentStore = useCustomerAppointmentStore();

  const selectedItemsData = selected.map((id) => appointmentStore.find(id));
  const selectedCount = selected.length;
  const actions = [];

  if (selectedCount === 1) {
    actions.push(
      <AppointmentEditAction key="edit_action" pkg={selectedItemsData[0]} />
    );
  }

  if (selectedCount > 0) {
    actions.push(
      <AppointmentChangeActiveAction
        activate={false}
        key="deactivate_action"
        appointments={selectedItemsData}
      />
    );
  }

  actions.push(<AppointmentCreateAction key="create_action" />);

  return <>{actions}</>;
};

const headers = [
  { id: 'id', numeric: true, label: 'Id' },
  { id: 'branch', numeric: false, label: 'Branch' },
  { id: 'time', numeric: false, label: 'Time' },
  { id: 'duration', numeric: false, label: 'Duration' },
  { id: 'completed', numeric: false, label: 'Completed' },
  { id: 'canceled', numeric: false, label: 'Canceled' },
];

const AppointmentRefreshAction = () => {
  const appointmentStore = useCustomerAppointmentStore();

  return (
    <>
      <Tooltip title="Refresh">
        <IconButton
          onClick={() => appointmentStore.refreshData()}
          aria-label="refresh"
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
const AppointmentCreateAction = () => {
  const [opened, setOpened] = useState(false);
  const branchStore = useBranchStore();
  const serviceStore = useServiceStore();
  const packageStore = usePackageStore();

  return (
    <>
      <Tooltip title="Create">
        <IconButton onClick={() => setOpened(true)} aria-label="create">
          <AddIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <CustomerAppointmentDialog
          edit={false}
          isOpened={opened}
          branchList={branchStore.branches}
          serviceList={serviceStore.services}
          packageList={packageStore.packages}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};
const AppointmentEditAction = ({ pkg: appointment }) => {
  const [opened, setOpened] = useState(false);
  const branchStore = useBranchStore();
  const serviceStore = useServiceStore();
  const packageStore = usePackageStore();

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => setOpened(true)} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <CustomerAppointmentDialog
          edit={true}
          appointment={appointment}
          branchList={branchStore.branches}
          serviceList={serviceStore.services}
          packageList={packageStore.packages}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const AppointmentChangeActiveAction = ({ appointments, activate = false }) => {
  const appointmentStore = useCustomerAppointmentStore();
  const [opened, setOpened] = useState(false);

  const handleAccept = async () => {
    await Promise.all(
      appointments.map(async (pkg) => {
        await updateCustomerAppointment({
          ...pkg,
          active: activate,
        });
      })
    );

    setOpened(false);
    appointmentStore.refreshData();
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
              <span>{`Do you want to deactivate following appointments?`}</span>
              <ul>
                {appointments.map((pkg) => (
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

export default Appointments;
