import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { useUserStore } from '../store/UserStore';
import SaleAPI from '../api/SaleAPI';
import { autorun } from 'mobx';

export const SaleContext = createContext();

export const SaleStoreProvider = ({ children }) => {
  const userStore = useUserStore();
  const allowedRoles = ['ADMIN', 'MANAGER'];

  const store = useLocalObservable(() => ({
    sales: [],
    todaySales: [],

    async refreshData() {
      if (allowedRoles.includes(userStore.role)) {
        const saleAPI = new SaleAPI(userStore.role);

        const [sales, todaySales] = await Promise.all([
          saleAPI.getAllSales(),
          saleAPI.getTodaySales(),
        ]);


        this.sales = sales;
        this.todaySales = todaySales;
      } else {
        this.sales = [];
        this.todaySales = [];
      }
    },
  }));

  useEffect(() =>
    autorun(() => {
      store.refreshData();
    })
  );

  return <SaleContext.Provider value={store}>{children}</SaleContext.Provider>;
};

export const useSaleStore = () => {
  return useContext(SaleContext);
};
