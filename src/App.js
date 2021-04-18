import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './components/Root';
import './BootstrapCustom.css';
import './App.css';
import './common/global-functions';

import { BrowserRouter as Router } from 'react-router-dom';
import { UserStoreProvider } from './store/UserStore';
import { EmployeeStoreProvider } from './store/EmployeeStore';
import { RoleStoreProvider } from './store/RoleStore';
import { BranchStoreProvider } from './store/BranchStore';
import { CustomerStoreProvider } from './store/CustomerStore';

const StoreProvider = ({ children }) => {
  return (
    <UserStoreProvider>
      <EmployeeStoreProvider>
        <RoleStoreProvider>
          <CustomerStoreProvider>
            <BranchStoreProvider>{children}</BranchStoreProvider>
          </CustomerStoreProvider>
        </RoleStoreProvider>
      </EmployeeStoreProvider>
    </UserStoreProvider>
  );
};

function App() {
  return (
    <StoreProvider>
      <Router>
        <Root />
      </Router>
    </StoreProvider>
  );
}

export default App;
