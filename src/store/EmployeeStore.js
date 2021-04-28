import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { useUserStore } from './UserStore';
import EmployeeAPI from '../api/EmployeeAPI';
import { autorun } from 'mobx';

export const EmployeeContext = createContext();

export const EmployeeStoreProvider = ({ children }) => {
  const userStore = useUserStore();
  const allowedRoles = ['ADMIN'];

  const store = useLocalObservable(() => ({
    employees: [],

    find(id) {
      return store.employees.find((emp) => emp.id === id);
    },

    findByUsername(username) {
      return store.employees.find((emp) => emp.user.username === username);
    },

    findIndex(id) {
      return store.employees.findIndex((emp) => emp.id === id);
    },

    setEmployee(id, employee) {
      const index = this.findIndex(id);
      this.employees[index] = employee;
    },

    setRole(id, role) {
      this.find(id).user.roles[0] = role;
    },

    setBranch(id, branch) {
      this.find(id).branch = branch;
    },

    async refreshData() {
      if (allowedRoles.includes(userStore.role)) {
        const employeeAPI = new EmployeeAPI(userStore.role);
        this.employees = await employeeAPI.getAllEmployees();
      } else {
        this.employees = [];
      }
    },
  }));

  useEffect(() =>
    autorun(() => {
      store.refreshData();
    })
  );

  return (
    <EmployeeContext.Provider value={store}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeStore = () => {
  return useContext(EmployeeContext);
};
