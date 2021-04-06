import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './components/Root';
import './BootstrapCustom.css';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { UserStoreProvider } from './store/UserStore';

function App() {
  return (
    <UserStoreProvider>
      <Router>
        <Root />
      </Router>
    </UserStoreProvider>
  );
}

export default App;
