import Dashboard from "./dashboard";
import { getmoviescall } from "./apicalls";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function MovieBoard() { 

    const [filters, setFilters] = useState({});
    const { data: moviesdata } = useQuery(
        ["m", filters],
        getmoviescall,
        {
          useErrorBoundary: true,
          suspense: true,
          staleTime: Infinity,
          keepPreviousData: true,
        }
      );

return (
<div>
    <Dashboard onChange={(filters) => {setFilters(filters)}} 
                       moviesdata={moviesdata}/>
</div>
    ) 
}