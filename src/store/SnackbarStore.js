import { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';

export const SnackbarContext = createContext();

export const SnackbarStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    type: 'success',
    message: '',
    opened: false,

    showSuccess(message) {
      this.type = 'success';
      this.message = message;
      this.opened = true;
    },

    showError(message) {
      store.type = 'error';
      store.message = message;
      store.opened = true;
    },
    showWarning(message) {
      this.type = 'warning';
      this.message = message;
      this.opened = true;
    },
    showInfo(message) {
      this.type = 'info';
      this.message = message;
      this.opened = true;
    },
    something() {
      this.type = 'info';
      this.message = 'something';
      this.opened = true;
    },

    handleClose() {
      this.opened = false;
    },
  }));

  return (
    <SnackbarContext.Provider value={store}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarStore = () => {
  return useContext(SnackbarContext);
};
