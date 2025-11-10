import { useEffect, useMemo, useState } from 'react';

const STALE_TIME = 0.3 * 60 * 1_000; 

interface CacheEntry<T> {
    data: T;
    lastFetched: number;
}


export const useCustomFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setisPending] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const storageKey = useMemo((): string => url + 'data', [url]);
    
      useEffect(() => {
    const fetchData = async () => {
        setIsError(false);
        setisPending(true);

        const currentTime = new Date().getTime();
        const cachedItem = localStorage.getItem(storageKey);

        if (cachedItem) {
            try {
                const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

                // 캐시가 신선하면 바로 사용
                if (currentTime - cachedData.lastFetched < STALE_TIME) {
                    setData(cachedData.data);
                    setisPending(false);
                    return;
                }

                // 캐시는 stale, 우선 보여주고 fetch 진행
                setData(cachedData.data);

            } catch {
                localStorage.removeItem(storageKey);
                console.warn('캐시 에러: 캐시 삭제');
            }
        }

        // 서버에서 새 데이터 fetch
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch data`);
            const newData = (await response.json()) as T;
            setData(newData);

            const newCacheEntry: CacheEntry<T> = {
                data: newData,
                lastFetched: new Date().getTime(),
            };
            localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsError(true);
        } finally {
            setisPending(false);
        }
    };

    fetchData();
}, [url, storageKey]);


      return {data, isPending, isError};
};