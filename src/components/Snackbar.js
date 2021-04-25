import MaterialSnackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSnackbarStore } from '../store/SnackbarStore';
import { useObserver } from 'mobx-react-lite';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Snackbar = () => {
  const snackbarStore = useSnackbarStore();

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return;

    snackbarStore.handleClose();
  };

  return useObserver(() => (
    <MaterialSnackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={snackbarStore.opened}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      {snackbarStore.type === 'success' ? (
        <Alert
          key={snackbarStore.key}
          onClose={snackbarStore.handleClose}
          severity="success"
        >
          {snackbarStore.message}
        </Alert>
      ) : snackbarStore.type === 'error' ? (
        <Alert
          key={snackbarStore.key}
          onClose={snackbarStore.handleClose}
          severity="error"
        >
          {snackbarStore.message}
        </Alert>
      ) : snackbarStore.type === 'info' ? (
        <Alert
          key={snackbarStore.key}
          onClose={snackbarStore.handleClose}
          severity="info"
        >
          {snackbarStore.message}
        </Alert>
      ) : (
        snackbarStore.type === 'warning' && (
          <Alert
            key={snackbarStore.key}
            onClose={snackbarStore.handleClose}
            severity="warning"
          >
            {snackbarStore.message}
          </Alert>
        )
      )}
    </MaterialSnackbar>
  ));
};

export default Snackbar;
