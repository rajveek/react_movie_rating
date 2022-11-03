import axios from "axios";

export const signupapicall = (array) =>{

axios.post("http://34.208.44.89:3006/auth/signup", {age: parseInt(array[3]),
name: array[1],
email: array[0],
password: array[2],  });
}

export const loginapicall = (array) =>{

    axios.post("http://34.208.44.89:3006/auth/login", {
    username: array[0],
    password: array[1],  });
    }

export const getcurrentuser =()=>
axios.get("http://34.208.44.89:3006/user/currentuser")

// export const editprofile =(array)=>{
//     axios.put(http://34.208.44.89:3006/auth/login")
// }