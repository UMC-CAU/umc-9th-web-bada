import { useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList.ts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import LpCard from "../components/LpCard/LpCard.tsx";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList.tsx";
import { useQueryClient } from "@tanstack/react-query";



const HomePage =() => {
    const [search, setSearch]: [string, React.Dispatch<React.SetStateAction<string>>] = useState("");

    const [order, setOrder] = useState<'asc' | 'desc'>('desc')
    const queryClient = useQueryClient();


    const { data: lps, isFetching, hasNextPage, fetchNextPage, isPending, isError } =
    useGetInfiniteLpList({ limit: 50, search, order});
    console.log("LPs data:", lps);

    const {ref, inView} = useInView({
        threshold: 0,
    }
    );

    // 정렬이나 검색이 바뀌면 쿼리 무효화 -> 새로 가져오기
  useEffect(() => {
  queryClient.invalidateQueries({
    queryKey: ["lps", search, order],
  });
}, [search, order, queryClient]);

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
    <div className="flex items-center justify-between mb-4">
    <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="border rounded px-2 py-1 flex-1 mr-4"
        />

        <div className="flex gap-2">
          <button
            onClick={() => setOrder('desc')}
            className={`px-3 py-1 border rounded hover:bg-gray-100 ${
              order === 'desc'
               ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
            aria-pressed={order === 'desc'}
          >
            최신순
          </button>

          <button
            onClick={() => setOrder('asc')}
            className={`px-3 py-1 border rounded hover:bg-gray-100 ${
              order === 'asc'
              ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
            aria-pressed={order === 'asc'}
          >
            오래된순
          </button>
        </div>
      </div>

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
