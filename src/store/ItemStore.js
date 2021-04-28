import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { useUserStore } from '../store/UserStore';
import ItemAPI from '../api/ItemAPI';
import { autorun } from 'mobx';

export const ItemContext = createContext();

export const ItemStoreProvider = ({ children }) => {
  const userStore = useUserStore();
  const allowedRoles = ['ADMIN', 'MANAGER', 'STOCK_KEEPER'];

  const store = useLocalObservable(() => ({
    items: [],

    find(id) {
      return store.items.find((pkg) => pkg.id === id);
    },

    findByName(name) {
      return store.items.find((pkg) => pkg.name === name);
    },

    async refreshData() {
      if (allowedRoles.includes(userStore.role)) {
        const itemAPI = new ItemAPI(userStore.role);
        this.items = await itemAPI.getAllItems();
      } else {
        this.items = [];
      }
    },
  }));

  useEffect(() =>
    autorun(() => {
      store.refreshData();
    })
  );

  return <ItemContext.Provider value={store}>{children}</ItemContext.Provider>;
};

export const useItemStore = () => {
  return useContext(ItemContext);
};
