import Button from '@material-ui/core/Button';
import MaterialSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from 'react';

export default function Snackbar({
  opened,
  message,
  duration = 5000,
  onClose,
}) {
  const [open, setOpen] = useState(opened);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!open) onClose(open);
  }, [open]);

  return (
    <div>
      <MaterialSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        message={message}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
}
