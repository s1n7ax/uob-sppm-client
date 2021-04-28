import { useState } from 'react';
import { useBranchStore } from '../store/BranchStore';
import TableOfContent from './TableOfContent2';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useObserver } from 'mobx-react-lite';
import AcceptDialog from './AcceptDialog';
import BranchDialog from './BranchDialog';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useUserStore } from '../store/UserStore';
import BranchAPI from '../api/BranchAPI';

const Branches = () => {
  const branchStore = useBranchStore();

  const createRow = (branch) => {
    const { id, location, contact, email, active } = branch;
    return { id, location, contact, email, active: String(active) };
  };

  return useObserver(() => (
    <TableOfContent
      title="Branches"
      headers={headers}
      rows={branchStore.branches.map((branch) => createRow(branch))}
      keyName="id"
      ActionBar={ActionBar}
    />
  ));
};

const ActionBar = ({ selected }) => {
  const branchStore = useBranchStore();

  const selectedItemsData = selected.map((id) => branchStore.find(id));
  const selectedCount = selected.length;
  const actions = [];

  if (selectedCount === 1) {
    actions.push(
      <BranchEditAction key="edit_action" branch={selectedItemsData[0]} />
    );
  }

  if (selectedCount > 0) {
    actions.push(
      <BranchChangeActiveAction
        activate={false}
        key="deactivate_action"
        branches={selectedItemsData}
      />
    );
    actions.push(
      <BranchChangeActiveAction
        activate={true}
        key="activate_action"
        branches={selectedItemsData}
      />
    );
  }

  actions.push(<BranchCreateAction key="create_action" />);
  actions.push(<BranchRefreshAction key="refresh_action" />);

  return <>{actions}</>;
};

const headers = [
  { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
  { id: 'contact', numeric: false, disablePadding: false, label: 'Contact' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'active', numeric: false, disablePadding: false, label: 'Active' },
];

const BranchRefreshAction = () => {
  const branchStore = useBranchStore();

  return (
    <>
      <Tooltip title="Refresh">
        <IconButton
          onClick={() => branchStore.refreshData()}
          aria-label="refresh"
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
const BranchCreateAction = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Create">
        <IconButton onClick={() => setOpened(true)} aria-label="create">
          <AddIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <BranchDialog
          edit={false}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};
const BranchEditAction = ({ branch }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => setOpened(true)} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <BranchDialog
          edit={true}
          branch={branch}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const BranchChangeActiveAction = ({ branches, activate = false }) => {
  const branchStore = useBranchStore();
  const [opened, setOpened] = useState(false);
  const userStore = useUserStore();
  const branchAPI = new BranchAPI(userStore.role);

  const handleAccept = async () => {
    await Promise.all(
      branches.map(async (branch) => {
        await branchAPI.updateBranch({
          ...branch,
          active: activate,
        });
      })
    );

    setOpened(false);
    branchStore.refreshData();
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
              <span>{`Do you want to deactivate following branches?`}</span>
              <ul>
                {branches.map((branch) => (
                  <li key={branch.id}>{`${branch.location}`}</li>
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

export default Branches;
