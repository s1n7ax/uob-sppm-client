import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { useUserStore } from './UserStore';
import AppointmentAPI from '../api/AppointmentAPI';

export const AppointmentContext = createContext();

export const CustomerAppointmentStoreProvider = ({ children }) => {
  const allowedRoles = ['CUSTOMER'];
  const userStore = useUserStore();

  const store = useLocalObservable(() => ({
    appointments: [],

    find(id) {
      return store.appointments.find((app) => app.id === id);
    },

    async refreshData() {
      if (allowedRoles.includes(userStore.role)) {
        const appointmentAPI = new AppointmentAPI();
        this.appointments = await appointmentAPI.getAllAppointments();
      } else {
        this.appointments = [];
      }
    },
  }));

  useEffect(
    () =>
      autorun(() => () => {
        store.refreshData();
      }),
    [userStore.role]
  );

  return (
    <AppointmentContext.Provider value={store}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentStore = () => {
  return useContext(AppointmentContext);
};
