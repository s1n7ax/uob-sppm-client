import { useState } from 'react';
import { useItemStore } from '../store/ItemStore';
import TableOfContent from './TableOfContent2';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useObserver } from 'mobx-react-lite';
import AcceptDialog from './AcceptDialog';
import { updateItem, createItem } from '../api/organization';
import ItemDialog from './ItemDialog';
import RefreshIcon from '@material-ui/icons/Refresh';

const ItemManagement = () => {
  const itemStore = useItemStore();

  const createRow = (pkg) => {
    const { id, name, description, active } = pkg;
    return { id, name, description, active: String(active) };
  };

  return useObserver(() => (
    <TableOfContent
      title="Items"
      headers={headers}
      rows={itemStore.items.map((item) => createRow(item))}
      keyName="id"
      ActionBar={ActionBar}
    />
  ));
};

const ActionBar = ({ selected }) => {
  const itemStore = useItemStore();

  const selectedItemsData = selected.map((id) => itemStore.find(id));
  const selectedCount = selected.length;
  const actions = [];

  if (selectedCount === 1) {
    actions.push(
      <ItemEditAction key="edit_action" pkg={selectedItemsData[0]} />
    );
  }

  if (selectedCount > 0) {
    actions.push(
      <ItemChangeActiveAction
        activate={false}
        key="deactivate_action"
        items={selectedItemsData}
      />
    );
    actions.push(
      <ItemChangeActiveAction
        activate={true}
        key="activate_action"
        items={selectedItemsData}
      />
    );
  }

  actions.push(<ItemCreateAction key="create_action" />);
  actions.push(<ItemRefreshAction key="refresh_action" />);

  return <>{actions}</>;
};

const headers = [
  { id: 'id', numeric: true, label: 'Id' },
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'description', numeric: false, label: 'Description' },
  { id: 'active', numeric: false, label: 'Active' },
];

const ItemRefreshAction = () => {
  const itemStore = useItemStore();

  return (
    <>
      <Tooltip title="Refresh">
        <IconButton
          onClick={() => itemStore.refreshData()}
          aria-label="refresh"
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
const ItemCreateAction = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Create">
        <IconButton onClick={() => setOpened(true)} aria-label="create">
          <AddIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <ItemDialog
          edit={false}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};
const ItemEditAction = ({ pkg: item }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => setOpened(true)} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <ItemDialog
          edit={true}
          item={item}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const ItemChangeActiveAction = ({ items, activate = false }) => {
  const itemStore = useItemStore();
  const [opened, setOpened] = useState(false);

  const handleAccept = async () => {
    await Promise.all(
      items.map(async (item) => {
        await updateItem({
          ...item,
          active: activate,
        });
      })
    );

    setOpened(false);
    itemStore.refreshData();
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
              <span>{`Do you want to deactivate following items?`}</span>
              <ul>
                {items.map((pkg) => (
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

export default ItemManagement;
