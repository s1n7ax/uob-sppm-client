import { useEffect, useState } from 'react';
import { usePackageStore } from '../store/PackageStore';
import TableOfContent from './TableOfContent2';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useObserver } from 'mobx-react-lite';
import AcceptDialog from './AcceptDialog';
import PackageDialog from './PackageDialog';
import RefreshIcon from '@material-ui/icons/Refresh';
import PackageAPI from '../api/PackageAPI';
import { useUserStore } from '../store/UserStore';
import { autorun } from 'mobx';

const Packages = () => {
  const packageStore = usePackageStore();
  const userStore = useUserStore();

  const createRow = (pkg) => {
    const { id, name, amount, allocatedHours, active } = pkg;
    return { id, name, amount, allocatedHours, active: String(active) };
  };

  return useObserver(() => (
    <TableOfContent
      title="Packages"
      headers={headers}
      rows={packageStore.packages.map((pkg) => createRow(pkg))}
      keyName="id"
      ActionBar={ActionBar}
      selection={userStore.role !== 'CUSTOMER' && userStore.role !== ''}
    />
  ));
};

const ActionBar = ({ selected }) => {
  const packageStore = usePackageStore();
  const userStore = useUserStore();

  const selectedItemsData = selected.map((id) => packageStore.find(id));
  const selectedCount = selected.length;
  const [actions, setActions] = useState([]);

  useEffect(
    () =>
      autorun(() => {
        console.log('rendering::packages');
        let actions = [];

        if (userStore.role === 'CUSTOMER' || userStore.role === '') {
          return;
        }

        if (selectedCount === 1) {
          actions.push(
            <PackageEditAction key="edit_action" pkg={selectedItemsData[0]} />
          );
        }

        if (selectedCount > 0) {
          actions.push(
            <PackageChangeActiveAction
              activate={false}
              key="deactivate_action"
              packages={selectedItemsData}
            />
          );
          actions.push(
            <PackageChangeActiveAction
              activate={true}
              key="activate_action"
              packages={selectedItemsData}
            />
          );
        }

        actions.push(<PackageCreateAction key="create_action" />);
        actions.push(<PackageRefreshAction key="refresh_action" />);

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

const PackageRefreshAction = () => {
  const packageStore = usePackageStore();

  return (
    <>
      <Tooltip title="Refresh">
        <IconButton
          onClick={() => packageStore.refreshData()}
          aria-label="refresh"
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
const PackageCreateAction = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Create">
        <IconButton onClick={() => setOpened(true)} aria-label="create">
          <AddIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <PackageDialog
          edit={false}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};
const PackageEditAction = ({ pkg }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => setOpened(true)} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <PackageDialog
          edit={true}
          pkg={pkg}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const PackageChangeActiveAction = ({ packages, activate = false }) => {
  const userStore = useUserStore();
  const packageStore = usePackageStore();
  const [opened, setOpened] = useState(false);

  const packageAPI = new PackageAPI(userStore.role);

  const handleAccept = async () => {
    await Promise.all(
      packages.map(async (pkg) => {
        await packageAPI.updatePackage({
          ...pkg,
          active: activate,
        });
      })
    );

    setOpened(false);
    packageStore.refreshData();
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
              <span>{`Do you want to deactivate following packages?`}</span>
              <ul>
                {packages.map((pkg) => (
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

export default Packages;
