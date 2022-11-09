import { useState } from "react";
import { loginapicall } from "./apicalls";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { getcurrentuser } from "./apicalls";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  //const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  //const [,setusername]=useState("")
  let user=""

  const loginMutate= useMutation(loginapicall,{
 
  onSuccess: (data,variable) => {
    //console.log("data",data.token)
    //console.log("variable",variable[0])
    //queryClient.setQueryData(['a'],setusername(variable[0]))
    navigate("/dashboard");
    getcurrentuser().then((res) => user=res.data);
    console.log(user)
    //setInputValue("")
  },
 
  
});


  function validateForm(e) {
    e.preventDefault();
    
    
    if (password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    
    if (passwordError ===false
    ) {
      const array=[email,password]
      loginMutate.mutate(array)
      setSuccessMessage(!successMessage);
    }
  }
 
  return (
    
    
    <div className="container text-center d-flex flex-column">
    <h1>Movista</h1>
   
{/* <ul classNameName="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
  <li classNameName="nav-item" role="presentation">
    <a classNameName="nav-link active" id="tab-login" data-mdb-toggle="pill" href="/login" role="tab"
      aria-controls="pills-login" aria-selected="true">Login</a>
  </li>
  <li classNameName="nav-item" role="presentation">
    <a classNameName="nav-link" id="tab-register" data-mdb-toggle="pill" href="/signup" role="tab"
      aria-controls="pills-register" aria-selected="false">Signup</a>
  </li>
</ul> */}


    <div><br></br></div>
      <h3>Login</h3>
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
        
        
        
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Done
          </button>
        </div>

        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
        <Link to="/" className="link-info">Sign up</Link>
                </p>
      </form>
      {successMessage && (
        <div>
          <br></br>
          <span className="alert alert-success">form submitted !</span>
        </div>

      )}
      <div>
      </div>
    </div>
    
  );
}