// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './BootstrapCustom.css';
import './App.css';

// js
import './common/global-functions';

//root
import Root from './components/Root';

// stores
import { BrowserRouter as Router } from 'react-router-dom';
import { UserStoreProvider } from './store/UserStore';
import { EmployeeStoreProvider } from './store/EmployeeStore';
import { RoleStoreProvider } from './store/RoleStore';
import { BranchStoreProvider } from './store/BranchStore';
import { CustomerStoreProvider } from './store/CustomerStore';
import { PackageStoreProvider } from './store/PackageStore';
import { ServiceStoreProvider } from './store/ServiceStore';
import { SnackbarStoreProvider } from './store/SnackbarStore';
import { CustomerAppointmentStoreProvider } from './store/CustomerAppointmentStore';
import { StockItemStoreProvider } from './store/StockItemStore';
import { SaleStoreProvider } from './store/SaleStore.';
import { ItemStoreProvider } from './store/ItemStore';

const App = () => {
  return (
    <SnackbarStoreProvider>
      <UserStoreProvider>
        <BranchStoreProvider>
          <EmployeeStoreProvider>
            <RoleStoreProvider>
              <StockItemStoreProvider>
                <CustomerStoreProvider>
                  <PackageStoreProvider>
                    <ServiceStoreProvider>
                      <CustomerAppointmentStoreProvider>
                        <SaleStoreProvider>
                          <ItemStoreProvider>
                            <Router>
                              <Root />
                            </Router>
                          </ItemStoreProvider>
                        </SaleStoreProvider>
                      </CustomerAppointmentStoreProvider>
                    </ServiceStoreProvider>
                  </PackageStoreProvider>
                </CustomerStoreProvider>
              </StockItemStoreProvider>
            </RoleStoreProvider>
          </EmployeeStoreProvider>
        </BranchStoreProvider>
      </UserStoreProvider>
    </SnackbarStoreProvider>
  );
};

export default App;
