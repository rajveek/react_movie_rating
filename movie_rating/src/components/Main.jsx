import {  NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Gravatar from "react-gravatar";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';

export default function Main({user,oldname,oldemail}) {

  const navigate = useNavigate();

  function logout(){
  //  navigate("/");
  //  window.location.reload(true)
  }
  //console.log("user",user)


  return (
    <div className=" text-center">
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
          <Navbar.Brand href="/"> Movista</Navbar.Brand>
          <Nav className="me-auto">
            
            <NavLink end to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink end to="/profile" className="nav-link">
              Edit Profile
            </NavLink>
          </Nav>
          <br></br>

          {user ? (
            <div
              style={{ overflow: "hidden" }}
              className="bg-info rounded-circle me-3"
            >
              <NavLink className="nav-link" to="/profile">
                <Gravatar
                  style={{ width: "2rem", height: "2rem" }}
                  title={user ? oldname : null}
                 email={user ? oldemail : null}
                />
              </NavLink>
            </div>
          ) : (
            <div style={{ overflow: "hidden" }} className="me-3">
              <button type="button" className="btn btn-outline-light">
                <NavLink
                  to="/login"
                  style={{ color: "unset", textDecoration: "unset" }}
                >
                  Login
                </NavLink>
              </button>
            </div>
          )}
          <button className="btn btn-outline-light" onClick={logout} >Logout</button>
        </Container>
      </Navbar>

    </div>
  );
}
