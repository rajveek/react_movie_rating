import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signupapicall } from "./apicalls";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [age, setAge] = useState(0);
  const [ageError, setAgeError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const signupMutate = useMutation(signupapicall);

  function validateForm(e) {
    e.preventDefault();
    if (age < 18) {
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
            Done signup
          </button>
        </div>
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