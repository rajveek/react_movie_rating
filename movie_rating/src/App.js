import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import Login from "./components/Login";
import Signup from "./components/Sigunup";
import { Routes, Route, Navigate } from "react-router-dom";
import MovieBoard from "./components/Movieboard";
import EditProfile from "./components/EditProfile";
import { UserContext } from "./components/UserContext";
import { useState, Suspense } from "react";
import React from "react";
import LoadingPage from "./components/LoadingPage";
//import { useNavigate } from 'react-router-dom';
function App() {
  //const navigate = useNavigate();
  const [loggedinUser, setUser] = useState(null);
  return (
    <ErrorBoundary fallback={<Navigate to="/login" />}>
    <Suspense fallback={<LoadingPage/>}>
      <UserContext.Provider value={[loggedinUser, setUser]}>
        <div>
          <div>
            <Routes>
              <Route index element={<Signup />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
              
                <Route
                  path="/profile"
                  element={<EditProfile/>}
                  // element={
                  //   loggedinUser ? <EditProfile /> : <Navigate to="/login" />
                  // }
                />
                <Route
                  path="/dashboard"
                  //element={<MovieBoard/>}
                  element={
                    loggedinUser ? <MovieBoard/> : <Navigate to="/login" />

                  }
                />
              
            </Routes>
          </div>
        </div>
      </UserContext.Provider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
