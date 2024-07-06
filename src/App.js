import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landingpage from './components/Landingpage';
import Signup from './components/Signup';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import UserDashboard from './components/UserDashboard';
import { AuthProvider } from './components/AuthProvider';
import Tasks from './components/Tasks';
import CreateTasks from './components/CreateTasks';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Routes>
      <Route path='/' element={<Landingpage />}>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Route>
      <Route path='/dashboard' element={<RequireAuth><UserDashboard /></RequireAuth>} />
        <Route path="/tasks" element={<RequireAuth><Tasks /></RequireAuth>} />
        <Route path="/create-task" element={<RequireAuth><CreateTasks /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><UserProfile /></RequireAuth>} />
        <Route path="/edit-profile" element={<RequireAuth><EditProfile/></RequireAuth>} />
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
