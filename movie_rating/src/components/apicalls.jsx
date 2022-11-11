import axios from "axios";

const newAxios = axios.create({
  //baseURL : "http://34.208.44.89:3006"
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials:false
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
    });
};

export const getcurrentuser = () =>
  newAxios.get("/user/currentuser", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const editprofile = (array) => {
  const data = { name: array[0], password: array[1], age: parseInt(array[2]) };
  newAxios.put("/user",data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// export const moviesearch = ({
//   limit,
//   sort = "genres",
//   sortOrder = "asc",
//   searchText = "",
//   skip,
// }) => {
//   const params = { sort: sort, sortOrder: sortOrder };
//   if (limit) params["limit"] = limit;
//   if (searchText) params["searchText"] = searchText;
//   if (skip) params["skip"] = skip;
//   newAxios
//     .get("/movies", {
//       params,
//       headers: { Authorization: `Bearer ${token}` },
//     })
// };

export const getmoviescall = ({
  limit,
  sortData = "genres",
  sortOrder = "asc",
  searchText = "",
  skipData,
  }) => {
  const params = { sort: sortData, sortOrder: sortOrder };
  if (limit) params["limit"] = limit;
  if (searchText) params["searchText"] = searchText;
  if (skipData) params["skip"] = skipData;
  return newAxios
  .get("/movies", {
  headers: { Authorization: `Bearer ${token}` },
  params,
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
