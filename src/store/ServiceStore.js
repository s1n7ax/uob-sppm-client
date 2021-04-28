import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { useUserStore } from '../store/UserStore';
import ServiceAPI from '../api/ServiceAPI';
import { autorun } from 'mobx';

export const ServiceContext = createContext();

export const ServiceStoreProvider = ({ children }) => {
  const userStore = useUserStore();
  const allowedRoles = ['ADMIN', 'MANAGER', 'CUSTOMER', ''];

  const store = useLocalObservable(() => ({
    services: [],

    find(id) {
      return store.services.find((pkg) => pkg.id === id);
    },

    findByName(name) {
      return store.services.find((pkg) => pkg.name === name);
    },

    async refreshData() {
      if (allowedRoles.includes(userStore.role)) {
        const serviceAPI = new ServiceAPI(userStore.role);
        this.services = await serviceAPI.getAllServices();
      } else {
        this.services = [];
      }
    },
  }));

  useEffect(() =>
    autorun(() => {
      store.refreshData();
    })
  );

  return (
    <ServiceContext.Provider value={store}>{children}</ServiceContext.Provider>
  );
};

export const useServiceStore = () => {
  return useContext(ServiceContext);
};
