import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { useUserStore } from './UserStore';
import { autorun } from 'mobx';
import AppointmentAPI from '../api/AppointmentAPI';

export const CustomerAppointmentContext = createContext();

export const CustomerAppointmentStoreProvider = ({ children }) => {
  const userStore = useUserStore();
  const allowedRoles = ['CUSTOMER'];

  const store = useLocalObservable(() => ({
    appointments: [],

    find(id) {
      return store.appointments.find((app) => app.id === id);
    },

    async refreshData() {
      if (allowedRoles.includes(userStore.role)) {
        const appointmentAPI = new AppointmentAPI(userStore.role);
        this.appointments = await appointmentAPI.getAllAppointments();
      } else {
        this.appointments = [];
      }
    },
  }));

  useEffect(() =>
    autorun(() => {
      store.refreshData();
    })
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
