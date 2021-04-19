import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { getAllServices } from '../api/organization';

export const ServiceContext = createContext();

export const ServiceStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    services: [],

    find(id) {
      return store.services.find((pkg) => pkg.id === id);
    },

    findByName(name) {
      return store.services.find((pkg) => pkg.name === name);
    },

    async refreshData() {
      this.services = await getAllServices();
    },
  }));

  useEffect(() => {
    store.refreshData();
  });

  return (
    <ServiceContext.Provider value={store}>{children}</ServiceContext.Provider>
  );
};

export const useServiceStore = () => {
  return useContext(ServiceContext);
};
