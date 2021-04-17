import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { getAllBranches } from '../api/organization';

export const BranchContext = createContext();

export const BranchStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    branches: [],

    find(id) {
      return store.branches.find((item) => item.id === id);
    },

    async refreshData() {
      store.branches = await getAllBranches();
    },
  }));

  useEffect(() => {
    store.refreshData();
  });

  return (
    <BranchContext.Provider value={store}>{children}</BranchContext.Provider>
  );
};

export const useBranchStore = () => {
  return useContext(BranchContext);
};
