import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { useUserStore } from './UserStore';
import BranchAPI from '../api/BranchAPI';
import { autorun } from 'mobx';

export const BranchContext = createContext();

export const BranchStoreProvider = ({ children }) => {
  const userStore = useUserStore();
  const allowedRoles = ['ADMIN', 'MANAGER', 'CUSTOMER'];

  const store = useLocalObservable(() => ({
    branches: [],

    find(id) {
      return store.branches.find((item) => item.id === id);
    },

    async refreshData() {
      if (allowedRoles.includes(userStore.role)) {
        const branchAPI = new BranchAPI(userStore.role);
        this.branches = await branchAPI.getAllBranches();
      } else {
        this.branches = [];
      }
    },
  }));

  useEffect(() =>
    autorun(() => {
      store.refreshData();
    })
  );

  return (
    <BranchContext.Provider value={store}>{children}</BranchContext.Provider>
  );
};

export const useBranchStore = () => {
  return useContext(BranchContext);
};
