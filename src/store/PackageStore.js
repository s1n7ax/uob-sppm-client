import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { getAllPackages } from '../api/organization';

export const PackageContext = createContext();

export const PackageStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    packages: [],

    find(id) {
      return store.packages.find((pkg) => pkg.id === id);
    },

    findByName(name) {
      return store.packages.find((pkg) => pkg.name === name);
    },

    async refreshData() {
      this.packages = await getAllPackages();
    },
  }));

  useEffect(() => {
    store.refreshData();
  });

  return (
    <PackageContext.Provider value={store}>{children}</PackageContext.Provider>
  );
};

export const usePackageStore = () => {
  return useContext(PackageContext);
};
