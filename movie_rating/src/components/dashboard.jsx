import { useState } from 'react';
import axios from 'axios';
export default function Dashboard() {

  const [limit,setlimit] = useState(0);
  const [sortby, setsortby] = useState("");
  const [sortorder, setsortorder] = useState("");
  const [searchtxt, setsearchtxt] = useState("");
  const [skip,setskip] = useState(0)


  function validateForm(e){
    e.preventDefault();
    console.log("done")
    axios.get('http://34.208.44.89:3006/movies', { params: { limit: limit,sort:sortby,sortOrder:sortorder,searchText:searchtxt,skip:skip } }).then((res) => console.log(res.json()));

    // axios.get("http://34.208.44.89:3006/movies").then((res) => console.log(res.data))
   

      
  }

  return (
   
    
    <div className="container text-center">
    <div><br></br></div>
    <h3>Movies data</h3>
    <br></br>
    <form onSubmit={validateForm}>
    <div className="mb-3">
        <input
          placeholder="limit"
          type="number"
          value={limit}
            onChange={(e) => setlimit(e.target.value)}
        />
        <br></br>{" "}
        
      </div>
      <div className="mb-3">
          <div className="btn-group">
          sort by :
            <select
            required
              className="form-select"

              value={sortby}
              onChange={(e) => setsortby(e.target.value)}
            >
              {/* <option value=""> sort by</option> */}
              <option value="genres"> genres</option>
              <option value="cast">cast</option>
              <option value="title">title</option>
              <option value="year">year</option>
              <option value="imdb.rating">imdb.rating</option>
            
            </select>
          </div>
          
        </div>
        <div className="mb-3 col-12">
          <div className="btn-group">
          sort order:
            <select
              required
              className="form-select"
              value={sortorder}
              onChange={(e) => setsortorder(e.target.value)}
            >
              {/* <option value="">Choose sort order</option> */}
              <option value="asc"> ascending</option>
              <option value="desc">descending</option>
              </select>
          </div>
         
        </div>
        <div className="mb-3">
          <input
          
            placeholder="enter search text"
            type="text"

            value={searchtxt}
            onChange={(e) => setsearchtxt(e.target.value)}
          />
          
        </div>
        <div className="mb-3">
        <input
        
          placeholder="skip"
          type="number"
          value={skip}
            onChange={(e) => setskip(e.target.value)}
          
        />
        <br></br>{" "}
        
      </div>
   
      
      
      
      
      <div className="col-12">
        <button className="btn btn-primary" type="submit">
          search
        </button>
      </div>
    </form>
    
  </div>
  );
}

