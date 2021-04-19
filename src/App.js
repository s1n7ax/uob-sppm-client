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
import { PackageStoreProvider } from './store/PackageStore';
import { ServiceStoreProvider } from './store/ServiceStore';
import { ItemStoreProvider } from './store/ItemStore';

const StoreProvider = ({ children }) => {
  return (
    <UserStoreProvider>
      <EmployeeStoreProvider>
        <RoleStoreProvider>
          <CustomerStoreProvider>
            <PackageStoreProvider>
              <ServiceStoreProvider>
                <ItemStoreProvider>
                  <BranchStoreProvider>{children}</BranchStoreProvider>
                </ItemStoreProvider>
              </ServiceStoreProvider>
            </PackageStoreProvider>
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
