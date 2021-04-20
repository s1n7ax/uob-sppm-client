import TableOfContent from './TableOfContent2';
import { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BookingDialog from './BookingDialog';
import { useBookingStore } from '../store/BookingStore';
import { useRoleStore } from '../store/RoleStore';
import { useObserver } from 'mobx-react-lite';
import AcceptDialog from './AcceptDialog';
import { updateBooking } from '../api/organization';

const BookingManagement = () => {
  const bookingStore = useBookingStore();

  const createRow = (booking) => {
    return {
      id: booking.id,
      name: `${booking.user.firstName} ${booking.user.lastName}`,
      username: booking.user.username,
      active: booking.user.active.toString(),
    };
  };

  return useObserver(() => (
    <>
      <TableOfContent
        title="Bookings"
        headers={headers}
        rows={bookingStore.bookings.map((emp) => createRow(emp))}
        keyName="id"
        ActionBar={ActionBar}
      />
    </>
  ));
};

const ActionBar = ({ selected }) => {
  const bookingStore = useBookingStore();

  const selectedItemsData = selected.map((id) => bookingStore.find(id));
  const selectedCount = selected.length;
  const actions = [];

  if (selectedCount === 1) {
    actions.push(
      <BookingEditAction key="edit_action" booking={selectedItemsData[0]} />
    );
  }

  if (selectedCount > 0) {
    actions.push(
      <BookingChangeActiveAction
        activate={false}
        key="deactivate_action"
        bookings={selectedItemsData}
      />
    );
    actions.push(
      <BookingChangeActiveAction
        activate={true}
        key="activate_action"
        bookings={selectedItemsData}
      />
    );
  }

  actions.push(<BookingCreateAction key="create_action" />);

  return <>{actions}</>;
};

const headers = [
  { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'active', numeric: false, disablePadding: false, label: 'Active' },
];

const BookingEditAction = ({ booking }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => setOpened(true)} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Tooltip>

      {opened && (
        <BookingDialog
          edit={true}
          booking={booking}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const BookingCreateAction = () => {
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
        <BookingDialog
          role={roleStore.findByName('CUSTOMER')}
          edit={false}
          isOpened={opened}
          closeWindow={() => setOpened(false)}
        />
      )}
    </>
  );
};

const BookingChangeActiveAction = ({ bookings, activate = false }) => {
  const bookingStore = useBookingStore();
  const [opened, setOpened] = useState(false);

  const handleAccept = async () => {
    await Promise.all(
      bookings.map(async (emp) => {
        await updateBooking({
          ...emp,
          user: { ...emp.user, active: activate },
        });
      })
    );

    setOpened(false);
    bookingStore.refreshData();
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
          title="Deactivate Booking"
          description={
            <div>
              <span>{`Do you want to deactivate following bookings?`}</span>
              <ul>
                {bookings.map((emp) => (
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

export default BookingManagement;
