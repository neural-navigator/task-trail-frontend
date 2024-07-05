import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landingpage from './components/Landingpage';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Landingpage />}>
        
      </Route>
      </Routes>
    </div>
  );
}

export default App;
