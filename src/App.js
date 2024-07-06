import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landingpage from './components/Landingpage';
import Signup from './components/Signup';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import UserDashboard from './components/UserDashboard';
import { AuthProvider } from './components/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Routes>
      <Route path='/' element={<Landingpage />}>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Route>
      <Route path='/dashboard' element={<RequireAuth><UserDashboard/></RequireAuth>} />
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
