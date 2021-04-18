import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { getAllCustomers } from '../api/organization';

export const CustomerContext = createContext();

export const CustomerStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    customers: [],

    find(id) {
      return store.customers.find((emp) => emp.id === id);
    },

    findByUsername(username) {
      return store.customers.find((emp) => emp.user.username === username);
    },

    async refreshData() {
      this.customers = await getAllCustomers();
    },
  }));

  useEffect(() => {
    store.refreshData();
  });

  return (
    <CustomerContext.Provider value={store}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerStore = () => {
  return useContext(CustomerContext);
};
