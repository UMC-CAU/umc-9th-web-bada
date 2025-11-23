import { useQuery } from '@tanstack/react-query'
import { getLpById } from '../../apis/lp.ts'
import { QUERY_KEY } from '../../constants/key.ts'

export const useLpDetail = (lpId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.lps.detail(lpId),
    queryFn: () => getLpById(lpId),
    enabled: !!lpId,
  })
}