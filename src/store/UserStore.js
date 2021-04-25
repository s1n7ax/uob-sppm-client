import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { getCurrentUserDetails } from '../api/organization';

const deleteAllCookies = () => {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

export const UserContext = createContext();

export const UserStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    username: '',
    firstName: '',
    lastName: '',
    role: '',

    serUserDetails({ username, firstName, lastName, role }) {
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.role = role;
    },

    logout() {
      deleteAllCookies();

      this.username = '';
      this.firstName = '';
      this.lastName = '';
      this.role = '';
    },

    setUserDetailsFromPublicUser(publicUserDetails) {
      this.serUserDetails({
        ...publicUserDetails,
        role: publicUserDetails.role[0].name,
      });
    },
  }));

  useEffect(() => {
    const asyncCallback = async () => {
      try {
        const user = await getCurrentUserDetails();
        store.setUserDetailsFromPublicUser(user);
      } catch (e) {
        store.serUserDetails({
          username: '',
          firstName: '',
          lastName: '',
          role: '',
        });
      }
    };

    asyncCallback();
  });

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};

export const useUserStore = () => {
  return useContext(UserContext);
};
