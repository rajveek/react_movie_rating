import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getcurrentuser, getmoviescall } from "./apicalls";
import Main from "./Main";
import MovieResult from "./MovieData";

export default function Dashboard() {

  const queryClient = useQueryClient();
  const [limit, setlimit] = useState(0);
  const [sortby, setsortby] = useState("genres");
  const [sortorder, setsortorder] = useState("asc");
  const [searchText, setsearchtxt] = useState("");
  const [page, setpage] = useState(1);


  let oldname, oldemail = null;
  const { data: user } = useQuery(["user-data"], getcurrentuser);
  const { data: moviesdata } = useQuery(["m"], getmoviescall, {
    staleTime: Infinity,
  });

  oldname = user?.data.name;
  oldemail = user?.data.email;

   function searchMovieData(e, page, flag) {
    e.preventDefault();
    // console.log("flag :", flag);
    // console.log((page - 1) * limit);
    const movies = getmoviescall({
      limit,
      sortby,
      sortorder,
      searchText,
      skipData: (page - 1) * limit,
    });
    movies.then((res) => {
      queryClient.setQueryData(["m"], res);
      setpage(page);
    });
  }

  return (
    <div>
     
      <Main user={user} oldname={oldname} oldemail={oldemail} />
      <div className="container text-center">
        <br></br>
        <h3>Search for your movie</h3>
        <br></br>
        <form
          id="searchBar"
          className="d-flex px-5"
          onSubmit={(e) => searchMovieData(e, page, 0)}
        >
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
          <h4>No data</h4>
        )}

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a
                className="page-link"
                href="/"
                aria-label="Previous"
                onClick={(e) => searchMovieData(e, page - 1, 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="/"
                aria-label="Next"
                onClick={(e) => searchMovieData(e, page + 1, 2)}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
