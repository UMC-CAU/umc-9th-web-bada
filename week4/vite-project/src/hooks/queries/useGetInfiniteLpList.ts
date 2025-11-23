import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";


function useGetInfiniteLpList(
  limit: number,
  search: string,
  order?: 'asc' | 'desc',
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }: { pageParam: number }) =>{
      // 🔍 여기 콘솔 넣기 — API 요청 파라미터 확인
      console.log("📌 API 요청 파라미터:", {
        cursor: pageParam,
        limit,
        search,
        order,
      });

      // 실제 API 호출
      return getLpList({ cursor: pageParam, limit, search, order });
    },
    queryKey: [QUERY_KEY.lps, search, order],
    initialPageParam: 0,

    
    
    getNextPageParam: (lastPage) => {
      console.log("📌 API 응답 데이터(lastPage):", lastPage.data.data);
        return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;
