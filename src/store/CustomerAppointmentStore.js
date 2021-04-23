import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { getAllAppointmentsByCustomer } from '../api/organization';

export const CustomerAppointmentContext = createContext();

export const CustomerAppointmentStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    appointments: [],

    find(id) {
      return store.appointments.find((app) => app.id === id);
    },

    async refreshData() {
      this.appointments = await getAllAppointmentsByCustomer();
    },
  }));

  useEffect(() => {
    store.refreshData();
  });

  return (
    <CustomerAppointmentContext.Provider value={store}>
      {children}
    </CustomerAppointmentContext.Provider>
  );
};

export const useCustomerAppointmentStore = () => {
  return useContext(CustomerAppointmentContext);
};
