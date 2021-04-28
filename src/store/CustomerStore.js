import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { useUserStore } from './UserStore';
import CustomerAPI from '../api/CustomerAPI';
import { autorun } from 'mobx';

export const CustomerContext = createContext();

export const CustomerStoreProvider = ({ children }) => {
  const userStore = useUserStore();
  const allowedRoles = ['ADMIN'];

  const store = useLocalObservable(() => ({
    customers: [],

    find(id) {
      return store.customers.find((emp) => emp.id === id);
    },

    findByUsername(username) {
      return store.customers.find((emp) => emp.user.username === username);
    },

    async refreshData() {
      if (allowedRoles.includes(userStore.role)) {
        const customerAPI = new CustomerAPI(userStore.role);
        this.customers = await customerAPI.getAllCustomers();
      } else {
        this.customers = [];
      }
    },
  }));

  useEffect(() =>
    autorun(async () => {
      await store.refreshData();
    })
  );

  return (
    <CustomerContext.Provider value={store}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerStore = () => {
  return useContext(CustomerContext);
};
