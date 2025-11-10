import { useState } from "react";
import { PAGINATION_ORDER } from "../enums/common.ts";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList.ts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import LpCard from "../components/LpCard/LpCard.tsx";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList.tsx";


const HomePage =() => {
    const [search, setSearch]: [string, React.Dispatch<React.SetStateAction<string>>] = useState("");

    const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError } =
    useGetInfiniteLpList({ limit: 50, search, order: PAGINATION_ORDER.desc });

    const {ref, inView} = useInView({
        threshold: 0,
    }
    );

    useEffect(() => {
  if (inView) {
    !isFetching && hasNextPage && fetchNextPage();
  }
}, [inView, isFetching, hasNextPage, fetchNextPage]);


    if (isPending) {
    return <div className="mt-20">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20">Error...</div>;
  }

  return (
  <div className="container mx-auto px-4 py-6">
    <input
      value={search}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value)
      }
    />

    <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
      {lps?.pages
        ?.map((page) => page.data.data)
        ?.flat()
        ?.map((lp) => <LpCard key={lp.id}lp={lp}/>)}
        {isFetching && 
        <LpCardSkeletonList count={20}/>}
    </div>
    <div ref = {ref} className ="h-2">
    
    </div>
  </div>
);

};

export default HomePage;
