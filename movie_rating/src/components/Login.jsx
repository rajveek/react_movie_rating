import { useState } from "react";
import { loginapicall } from "./apicalls";
import { useMutation,useQueryClient } from "@tanstack/react-query";


export default function Login() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [username,setusername]=useState("")

  const loginMutate= useMutation(loginapicall,{
  useErrorBoundary:true, 
  staleTime:10000*60,
  onSuccess: (data,variable) => {
    console.log(data)
    console.log("variable",variable[0])
    queryClient.setQueryData(['a'],setusername(variable[0]))
    // setInputValue("")
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
    <div className="container text-center">
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