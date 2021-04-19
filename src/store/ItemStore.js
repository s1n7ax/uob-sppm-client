import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { getAllItems } from '../api/organization';

export const ItemContext = createContext();

export const ItemStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    items: [],

    find(id) {
      return store.items.find((pkg) => pkg.id === id);
    },

    findByName(name) {
      return store.items.find((pkg) => pkg.name === name);
    },

    async refreshData() {
      this.items = await getAllItems();
    },
  }));

  useEffect(() => {
    store.refreshData();
  });

  return <ItemContext.Provider value={store}>{children}</ItemContext.Provider>;
};

export const useItemStore = () => {
  return useContext(ItemContext);
};
