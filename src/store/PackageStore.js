import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import PackageAPI from '../api/PackageAPI';
import { useUserStore } from './UserStore';
import { autorun } from 'mobx';

export const PackageContext = createContext();

export const PackageStoreProvider = ({ children }) => {
  const userStore = useUserStore();
  const allowedRoles = ['ADMIN', 'MANAGER', 'CUSTOMER', ''];

  const store = useLocalObservable(() => ({
    packages: [],

    find(id) {
      return store.packages.find((pkg) => pkg.id === id);
    },

    findByName(name) {
      return store.packages.find((pkg) => pkg.name === name);
    },

    async refreshData() {
      if (allowedRoles.includes(userStore.role)) {
        const packageAPI = new PackageAPI(userStore.role);
        this.packages = await packageAPI.getAllPackages();
      } else {
        this.packages = [];
      }
    },
  }));

  useEffect(
    () =>
      autorun(() => {
        store.refreshData();
      }),
    [userStore.role]
  );

  return (
    <PackageContext.Provider value={store}>{children}</PackageContext.Provider>
  );
};

export const usePackageStore = () => {
  return useContext(PackageContext);
};
