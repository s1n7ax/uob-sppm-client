import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { getAllEmployees } from '../api/organization';

export const EmployeeContext = createContext();

export const EmployeeStoreProvider = ({ children }) => {
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
      this.employees = await getAllEmployees();
    },
  }));

  useEffect(() => {
    store.refreshData();
  });

  return (
    <EmployeeContext.Provider value={store}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeStore = () => {
  return useContext(EmployeeContext);
};
