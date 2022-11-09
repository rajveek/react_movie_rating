
import './App.css';
//import { ErrorBoundary } from "react-error-boundary"
import Login from './components/Login';
import Signup from './components/Sigunup';
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/dashboard';
import EditProfile from './components/EditProfile';
//import { useNavigate } from 'react-router-dom';
function App() {
  //const navigate = useNavigate();
  return (
    // <ErrorBoundary fallback={<Login/>}>
    <div>
    <div>
        <Routes>
          <Route index element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/profile" element={<EditProfile />} />
          {/* <Route path="/dashboard" element={user?<Dashboard/>:<Login />} /> */}
        </Routes>
    </div>
    </div>
    // </ErrorBoundary>
  );
}

export default App;
