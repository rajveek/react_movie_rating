import { Routes, Route, NavLink ,Navigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Home from "./Home";
import Login from "./Login";
import Signup from "./Sigunup";
import Gravatar from "react-gravatar";
//import createResource from "../createResource";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar"
import Container from 'react-bootstrap/Container';
import { useState } from "react";
import Dashboard from "./dashboard";
import { getcurrentuser } from "./apicalls";
import { useQuery } from "@tanstack/react-query";
//const userResource = createResource(axios.get("http://localhost:3000/user").then((res) => res.data));

export default function Main() {
 const username="a"
  // const { data: username} = useQuery(
  //   ["username"],
  //   () => {
  //     return axios.get("http://34.208.44.89:3006/user/currentuser").then((res) => console.log(res.data));
  //   },
  //   { useErrorBoundary: true }
  // );
  
  
  return (
    <div className=" text-center">
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Container>
      
      <Navbar.Brand href="/" > Movista</Navbar.Brand>
      <Nav className="me-auto">
            <NavLink end to="/" className="nav-link">
                  Home
                </NavLink>
            <NavLink end to="/signup" className="nav-link">
                  Signup
                </NavLink>
            <NavLink end to="/login" className="nav-link">
                  login
                </NavLink>
                <NavLink end to="/dashboard" className="nav-link">
                  Dashboard
                </NavLink>
          </Nav>
        <br></br>
       
        
          
            
            {/* <Nav className="justify-content-end">
            <span  style={{ overflow: "hidden"  }} className=" bg-info rounded-circle">
          <Gravatar
            style={{ width: "4rem", height: "4rem" }}
            title={currentUser.name}
            email={currentUser.email}
          />
      
        </span>
        </Nav> */}
        </Container> 
      </Navbar>
      
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={username?<Dashboard/>:<Login />} />
        </Routes>
      </div>
    </div>
  );
}
