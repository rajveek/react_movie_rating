import { useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getcurrentuser } from "./apicalls";
import { editprofile } from "./apicalls";
import Main from "./Main";
import { UserContext } from "./UserContext";
let oldname,oldemail,oldage=null

export default function EditProfile() {
  const [{user,token},setUser]= useContext(UserContext);

  // const {data:user} =useQuery(['user-data'],getcurrentuser,{
  //   onSuccess:(data)=>{
  //     setUser(user);
  //     console.log("user")
  //   }
  // })
  // console.log(user.data)

  oldname=user.name
  oldage=user.age
  oldemail=user.email

  const [name, setName] = useState(oldname);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [age, setAge] = useState(parseInt(oldage));
  const [successMessage, setSuccessMessage] = useState(false);
  const [ageError, setAgeError] = useState(false);
  //const [loggedinUser,setUser]=useContext(UserContext)

  
  const editMutate= useMutation(editprofile,{
    useErrorBoundary:true, 
    staleTime:10000*60*60,
    onSuccess: (data,variable) => {
      console.log(data,variable)
      setUser({
        token,user:data
      })
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
    
    
    if(passwordError===false  )
    {
    
      //console.log("here")
      setSuccessMessage(!successMessage);
      const array=[name,password,age]
      console.log(array)
      editMutate.mutate(array)
    }
    
  }
  return (
    <div><Main user={user}  oldname={oldname} oldemail={oldemail}  />
    <div className="container text-center">
    
    <div><br></br></div>
      <h3>Edit Profile</h3>
      <br></br>
      <form onSubmit={validateForm}>
      
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
            placeholder="enter your age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {ageError && (
            <div>
              <br></br>
              <span className="alert alert-danger">
                age must be more than 10
              </span>
            </div>
          )}
         
        </div>
        
       
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Save changes
          </button>
        </div>
      </form>
      {successMessage && (
        <div>
          <br></br>
          <span className="alert alert-success">updated succesfully</span>
        </div>
      )}
    </div>
    </div>
  );
}