import { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';

export const UserContext = createContext();

export const UserStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    username: 'Srinesh Nisala',
    role: 'admin',

    serUserDetails(username, role) {
      store.username = username;
      store.role = role;
    },
  }));

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};

export const useUserStore = () => {
  return useContext(UserContext);
};
