import { useQuery, useQueryClient } from "@tanstack/react-query";
import {  useState } from "react";
import { getcurrentuser, getmoviescall } from "./apicalls";
//import { moviesearch } from './apicalls';
import Main from "./Main";
import MovieResult from "./MovieData";
export default function Dashboard() {
  const queryClient = useQueryClient();
  const [limit, setlimit] = useState(0);
  const [sortby, setsortby] = useState("genres");
  const [sortorder, setsortorder] = useState("asc");
  const [searchText, setsearchtxt] = useState("");
  const [page,setpage]=useState(1)


  
  // User is currently on this page
  // const [currentPage, setCurrentPage] = useState(1);
  // // No of Records to be displayed on each page
  // const [recordsPerPage] = useState(10);
  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // // Records to be displayed on the current page
  // const currentRecords = data.slice(indexOfFirstRecord,
  //   indexOfLastRecord);
  //   const nPages = Math.ceil(data.length / recordsPerPage)
  let oldname,
    oldemail = null;
  //let moviesd = null;
  const { data: user } = useQuery(["user-data"], getcurrentuser);
  const { data: moviesdata } = useQuery(["m"], getmoviescall,{staleTime:Infinity});
  // useEffect(()=>{
  //     console.log('data changes')
  //   },[moviesdata])
  // const { data: res } = useQuery(
  //   ["movies", currentPage],
  //   getmoviescall({ limit, sortby, sortorder, searchText, skipData }),
  //   {
  //     keepPreviousData: true,
  //     notifyOnChangeProps: ["data"],
  //     select: (res) => {
  //       const totaldoc = Number.parseInt(res.headers.get('X-Total-Count'),4);
  //       return{
  //         data:res.data,
  //         TotalPages:Math.ceil(totaldoc/4)
  //       }
  //     },
  //   }
  // );
  // useEffect(()=>{
  //   console.log('data changes')
  // },[res])

  //console.log(user)
  //  const {data:movies}=getmoviescall({limit, sortby,sortorder, searchtxt,skip})

  //  console.log("moviesdata :",movies)
  //const {data:movies}=useQuery(['movie'],getmoviescall({limit, sortby,sortorder, searchtxt,skip}))

  oldname = user?.data.name;
  oldemail = user?.data.email;

  //  const {data:moviedata}=useQuery(['movie-data'],moviesearch({
  //   sort: "genres",
  //   sortOrder: "asc",
  // }),{staleTime:1000*60*60})
  // console.log(moviedata)
  //moviesearch({limit, sortby,sortorder, searchtxt,skip}).then(res=>console.log(res.data));
  //getmoviescall({limit,sortData,sortOrder,searchText,skipData}).then(res => console.log(res.data))
  function validateForm(e) {
    e.preventDefault();
    console.log(sortby);
    console.log(sortorder);
    //setskip((page-1)*limit)
    console.log((page-1)*limit)
    const movies = getmoviescall({
      limit,
      sortby,
      sortorder,
      searchText,
      skipData:(page-1)*limit,
    });
    ;
    movies.then((res) => {
      console.log("Response is ",res)
      queryClient.setQueryData(["m"], res);
    });
  }

  function nextpage(e){
    e.preventDefault()
    console.log(limit,page)
    const movies = getmoviescall({
      limit,
      sortby,
      sortorder,
      searchText,
      skipData:page*limit,
    });
    ;
    movies.then((res) => {
      console.log("Response is ",res)
      queryClient.setQueryData(["m"], res);
    });
  

  }
  function previouspage(){
    console.log(limit,page)
    const movies = getmoviescall({
      limit,
      sortby,
      sortorder,
      searchText,
      skipData:(page-1)*limit,
    });
    ;
    movies.then((res) => {
      console.log("Response is ",res)
      queryClient.setQueryData(["m"], res);
    });
  

  }
  console.log("moviesdata :", moviesdata);
  //console.log("moviesdata.data :", moviesdata.data);
  //console.log("moviesd type:", (moviesdata.data == undefined));
  return (
    <div>
      {/* {user=!null && user.status==200? */}
      <Main user={user} oldname={oldname} oldemail={oldemail} />
      {/* } */}
      <div className="container text-center">
        <br></br>

        <h3>Search for your movie</h3>

        <br></br>
        <form id="searchBar" className="d-flex px-5" onSubmit={validateForm}>
        <div className="d-flex flex-column me-3">
            <input
              placeholder="enter search text"
              type="text"
              value={searchText}
              onChange={(e) => setsearchtxt(e.target.value)}
            />
          </div>
         
          <div className="d-flex flex-column me-3">
            <div className="btn-group">
              {/* sort by : */}

              <select
                className="form-select text-truncate"
                value={sortby}
                onChange={(e) => setsortby(e.target.value)}
              >
                <option value=""> sort by</option>
                <option value="genres"> genres</option>
                <option value="cast">cast</option>
                <option value="title">title</option>
                <option value="year">year</option>
                <option value="imdb.rating">imdb.rating</option>
              </select>
            </div>
          </div>
          <div className="d-flex flex-column me-3">
            <div className="btn-group">
              {/* sort order: */}
              <select
                required
                className="form-select text-truncate"
                value={sortorder}
                onChange={(e) => setsortorder(e.target.value)}
              >
                {/* <input value="">Choose sort order</input> */}
                <option value="asc"> ascending</option>
                <option value="desc">descending</option>
              </select>
            </div>
          </div>
          <div className="d-flex flex-column me-3">
            <input
              placeholder="limit"
              type="number"
              value={limit}
              onChange={(e) => setlimit(e.target.value)}
            />
            <br></br>{" "}
          </div>
          <div className="d-flex flex-column me-3">
            <input
              placeholder="page"
              type="number"
              value={page}
              onChange={(e) => setpage(e.target.value)}
            />
            <br></br>{" "}
          </div>

          <div className="d-flex flex-column me-3">
            <button className="btn btn-primary" type="submit">
              search
            </button>
          </div>
        </form>
        <h3>Movie Results</h3>
        {moviesdata != null ? ( 
          <div className="row">
            {moviesdata.data.map((item) => {
              return (
                <MovieResult
                  title={item["title"]}
                  imgsrc={item["poster"]}
                  fullplot={item["plot"]}
                  rating={item["imdb"]["rating"]}
                  writer={item["writers"]}
                />
              );
            })}
          </div>
        ) : (
          <h4>no data</h4>
        )}

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="/" aria-label="Previous" onClick={previouspage}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li> 
            <li className="page-item">
              <a className="page-link" href="/" aria-label="Next" onClick={nextpage}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
