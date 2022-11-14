import axios from "axios";

const newAxios = axios.create({
  //baseURL : "http://34.208.44.89:3006"
  baseURL: process.env.REACT_APP_API_URL
 })


export const signupapicall = (array) => {
  newAxios.post("/auth/signup", {
    age: parseInt(array[3]),
    name: array[1],
    email: array[0],
    password: array[2],
  });
};

export const loginapicall = (array) => {
  return newAxios
    .post("/auth/login", {
      username: array[0],
      password: array[1],
    })
    .then((res) => {
      console.log(res.data.token);
      token = res.data.token;
      return res.data
    });
};

export const getcurrentuser = () =>
  newAxios.get("/user/currentuser", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const editprofile = (array) => {
  const data = { name: array[0], password: array[1], age: parseInt(array[2]) };
  return newAxios.put("/user",data, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res)=>res.data);
};

export const getmoviescall = ({
  queryKey: [
    ,
    { limit, sortData = "genres", sortOrder = "asc", searchText = "", skipData },
  ],
}) => {
  return newAxios
    .get("/movies", {
      headers: { Authorization: `Bearer ${token}` },
      params:{limit : limit ?? 12,
      sort: sortData || 'genres',
      sortOrder: sortOrder || 'asc',
      searchText: searchText || undefined,
      skip:skipData },
    })
};

let token = null;
const instance = newAxios.create((config) => ({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: token ? `Bearer $(token)` : null,
  },
}));
export const storeJwt = (token) => {
  instance.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
};
