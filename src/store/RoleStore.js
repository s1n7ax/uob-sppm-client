import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { getAllRoles } from '../api/organization';

export const RoleContext = createContext();

export const RoleStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    roles: [],

    find(id) {
      return store.roles.find((emp) => emp.id === id);
    },

    findByName(name) {
      return store.roles.find(
        (emp) => emp.name.toLowerCase() === name.toLowerCase()
      );
    },

    findIndex(id) {
      return store.roles.findIndex((emp) => emp.id === id);
    },

    async refreshData() {
      this.roles = await getAllRoles();
    },
  }));

  useEffect(() => {
    store.refreshData();
  });

  return <RoleContext.Provider value={store}>{children}</RoleContext.Provider>;
};

export const useRoleStore = () => {
  return useContext(RoleContext);
};
