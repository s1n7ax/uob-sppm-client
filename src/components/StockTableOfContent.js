import { useState } from 'react';
import { usePackageStore } from '../store/PackageStore';
import TableOfContent from './TableOfContent2';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useObserver } from 'mobx-react-lite';
import AcceptDialog from './AcceptDialog';
import StockItemDialog from './StockItemDialog';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useBranchStore } from '../store/BranchStore';
import { useItemStore } from '../store/ItemStore';
import { useUserStore } from '../store/UserStore';
import StockItemAPI from '../api/StockItemAPI';

const StockTableOfContent = ({ title, stocks, onUpdate }) => {
  const createRow = (stockItem) => {
    const { id, item, branch, count, active } = stockItem;
    return {
      id,
      item: item.name,
      branch: branch.location,
      count,
      active: String(active),
    };
  };

  const ActionBar = ({ selected }) => {
    const selectedItemsData = selected.map((id) =>
      stocks.find((stock) => stock.id === id)
    );
    const selectedCount = selected.length;
    const actions = [];

    if (selectedCount === 1) {
      actions.push(
        <StockEditAction
          onUpdate={onUpdate}
          key="edit_action"
          stockItem={selectedItemsData[0]}
        />
      );
    }

    if (selectedCount > 0) {
      actions.push(
        <StockChangeActiveAction
          onUpdate={onUpdate}
          activate={false}
          key="deactivate_action"
          stockItems={selectedItemsData}
        />
      );
      actions.push(
        <StockChangeActiveAction
          onUpdate={onUpdate}
          activate={true}
          key="activate_action"
          stockItems={selectedItemsData}
        />
      );
    }

    actions.push(<StockCreateAction onUpdate={onUpdate} key="create_action" />);

    return <>{actions}</>;
  };

  return useObserver(() => (
    <TableOfContent
      title={title}
      headers={headers}
      rows={stocks.map((stock) => createRow(stock))}
      keyName="id"
      ActionBar={ActionBar}
    />
  ));
};

const headers = [
  { id: 'id', numeric: true, label: 'Id' },
  { id: 'item', numeric: false, label: 'Item' },
  { id: 'branch', numeric: false, label: 'Branch' },
  { id: 'count', numeric: false, label: 'Count' },
  { id: 'active', numeric: false, label: 'Active' },
];

const StockRefreshAction = () => {
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

const StockCreateAction = ({ onUpdate }) => {
  const [opened, setOpened] = useState(false);
  const branchStore = useBranchStore();
  const itemStore = useItemStore();


  return (
    <>
      <Tooltip title="Create">
        <IconButton onClick={() => setOpened(true)} aria-label="create">
          <AddIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <StockItemDialog
          onUpdate={onUpdate}
          branchList={branchStore.branches}
          itemList={itemStore.items}
          edit={false}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const StockEditAction = ({ stockItem, onUpdate }) => {
  const branchStore = useBranchStore();
  const itemStore = useItemStore();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => setOpened(true)} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <StockItemDialog
          onUpdate={onUpdate}
          branchList={branchStore.branches}
          itemList={itemStore.items}
          edit={true}
          stock={stockItem}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const StockChangeActiveAction = ({
  onUpdate,
  stockItems,
  activate = false,
}) => {
  const [opened, setOpened] = useState(false);
  const userStore = useUserStore();
  const stockItemAPI = new StockItemAPI(userStore.role);

  const handleAccept = async () => {
    await Promise.all(
      stockItems.map(async (stock) => {
        await stockItemAPI.updateStockItem({
          ...stock,
          active: activate,
        });
      })
    );

    setOpened(false);
    onUpdate();
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
                {stockItems.map((stock) => (
                  <li key={stock.id}>{`${stock.item.name}`}</li>
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

export default StockTableOfContent;
