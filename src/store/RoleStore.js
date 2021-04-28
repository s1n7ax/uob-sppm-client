import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { useUserStore } from './UserStore';
import RoleAPI from '../api/RoleAPI';
import { autorun } from 'mobx';

export const RoleContext = createContext();

export const RoleStoreProvider = ({ children }) => {
  const userStore = useUserStore();
  const allowedRoles = ['ADMIN'];

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
      if (allowedRoles.includes(userStore.role)) {
        const roleAPI = new RoleAPI(userStore.role);
        this.roles = await roleAPI.getAllRoles();
      } else {
        this.roles = [];
      }
    },
  }));

  useEffect(() =>
    autorun(() => {
      store.refreshData();
    })
  );

  return <RoleContext.Provider value={store}>{children}</RoleContext.Provider>;
};

export const useRoleStore = () => {
  return useContext(RoleContext);
};
