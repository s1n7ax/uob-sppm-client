import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { getAllAppointmentsByCustomer } from '../api/organization';
import { useUserStore } from './UserStore';
import { autorun } from 'mobx';

export const CustomerAppointmentContext = createContext();

export const CustomerAppointmentStoreProvider = ({ children }) => {
  const userStore = useUserStore();
  const store = useLocalObservable(() => ({
    appointments: [],

    find(id) {
      return store.appointments.find((app) => app.id === id);
    },

    async refreshData() {
      this.appointments = await getAllAppointmentsByCustomer();
    },
  }));

  useEffect(
    () =>
      autorun(() => {
        if (userStore.role.toLowerCase() === 'customer') store.refreshData();
        store.appointments = [];
      }),
    [userStore.role]
  );

  return (
    <CustomerAppointmentContext.Provider value={store}>
      {children}
    </CustomerAppointmentContext.Provider>
  );
};

export const useCustomerAppointmentStore = () => {
  return useContext(CustomerAppointmentContext);
};
