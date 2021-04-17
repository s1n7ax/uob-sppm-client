import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AcceptDialog = ({
  opened,
  title,
  description,
  handleAccept,
  handleClose,
  warning = true,
  acceptButtonText = 'OK',
  cancelButtonText = 'CANCEL',
}) => {
  return (
    <div>
      <Dialog
        open={opened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {cancelButtonText}
          </Button>
          <Button
            onClick={handleAccept}
            color={warning ? 'secondary' : 'primary'}
            autoFocus
          >
            {acceptButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AcceptDialog;
