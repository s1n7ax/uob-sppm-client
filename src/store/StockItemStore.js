import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { useUserStore } from '../store/UserStore';
import StockItemAPI from '../api/StockItemAPI';

export const StockItemContext = createContext();

export const StockItemStoreProvider = ({ children }) => {
  const userStore = useUserStore();
  const allowedRoles = ['ADMIN', 'MANAGER'];

  const store = useLocalObservable(() => ({
    stockItems: [],

    find(id) {
      return store.stockItems.find((pkg) => pkg.id === id);
    },

    findByName(name) {
      return store.stockItems.find((pkg) => pkg.name === name);
    },

    async refreshData() {
      if (allowedRoles.includes(userStore.role)) {
        const stockItemAPI = new StockItemAPI(userStore.role);
        this.stockItems = await stockItemAPI.getAllStockItems();
      } else {
        this.stockItems = [];
      }
    },
  }));

  useEffect(() => {
    store.refreshData();
  });

  return (
    <StockItemContext.Provider value={store}>
      {children}
    </StockItemContext.Provider>
  );
};

export const useStockItemStore = () => {
  return useContext(StockItemContext);
};
