import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signupapicall } from "./apicalls";
import { useNavigate } from 'react-router-dom';
import {  NavLink } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [age, setAge] = useState(0);
  const [ageError, setAgeError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const signupMutate= useMutation(signupapicall,{
    useErrorBoundary:true, 
    staleTime:10000*60*60,
    onSuccess: (data,variable) => {
     navigate("/login");
      
    }
  });



  function validateForm(e) {
    e.preventDefault();
    if (age < 10) {
      setAgeError(true);
    } else {
      setAgeError(false);
    }
    
    if (password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    
    
    
   
    if(passwordError===false && ageError===false )
    {
      console.log("here")
      setSuccessMessage(!successMessage);
      const array=[email,name,password,age]
      console.log(array)
      signupMutate.mutate(array)
    
    }
  }
  return (
    <div className="container text-center">
    <h1>Movista</h1>
    <div><br></br></div>
      <h3>Signup</h3>
      <br></br>
      <form onSubmit={validateForm}>
        <div className="mb-3">
          <input
          required
            placeholder="enter your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>{" "}
          
        </div>
        <div className="mb-3">
          <input
          required
            placeholder="enter 8 digit password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>{" "}
          {passwordError && (
            <div>
              <br></br>
              <span className="alert alert-danger">
                Password is required and must be 8 or more characters
              </span>
            </div>
          )}
        </div>
        <div className="mb-3">
          <input
          required
            placeholder="enter your name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br></br>{" "}
          
        </div>
        <div className="mb-3">
          <input
          required
            placeholder="enter your age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {ageError && (
            <div>
              <br></br>
              <span className="alert alert-danger">
                age must be more than 18
              </span>
            </div>
          )}
        </div>
        
       
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Done 
          </button>
        </div>
        <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? 
        <NavLink to="/login" className="link-info">Login</NavLink>
         {/* <a href="/signup" onClick={gotosinup}
                className="link-danger">Signup</a> */}
                </p>
      </form>
      {successMessage && (
        <div>
          <br></br>
          <span className="alert alert-success">form submitted !</span>
        </div>
      )}
     
    </div>
  );
}