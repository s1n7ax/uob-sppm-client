import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { getAllAppointments } from '../api/organization';

export const AppointmentContext = createContext();

export const CustomerAppointmentStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    appointments: [],

    find(id) {
      return store.appointments.find((app) => app.id === id);
    },

    async refreshData() {
      this.appointments = await getAllAppointments();
    },
  }));

  useEffect(() => {
    store.refreshData();
  });

  return (
    <AppointmentContext.Provider value={store}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentStore = () => {
  return useContext(AppointmentContext);
};
