import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig { _retry?: boolean; }

let refreshPromise: Promise<string> | null = null;

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000',
  // 필요에 따라 v1을 포함하셔도 됩니다
    baseURL: "https://umc-web.kyeoungwoon.kr/",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // LocalStorage에서 토큰을 가져옵니다. (키는 상수를 사용해야 합니다.)
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    if (token) {
      
      const cleanToken = token.replace(/"/g, ''); 
      
      if (cleanToken){
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${cleanToken}`;
      }
      

      
      console.log("Axios Interceptor Token (Clean):", cleanToken);
      console.log("Authorization Header Set:", config.headers.Authorization);
    } else {
        console.log("Axios Interceptor: Access Token Not Found.");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (401 에러를 통한 토큰 갱신 처리)
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;
    

    // 401 에러이며, 아직 재시도하지 않은 요청 처리
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry // 재시도 플래그 확인
    ) {
      // ⭐️ Refresh 토큰 엔드포인트에서 401 에러가 발생한 경우 (Refresh Token 만료)
      if (originalRequest.url === "/v1/auth/refresh") {
        
        const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        removeAccessToken();
        removeRefreshToken();
        
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;

      if (!refreshPromise) {
            
            // refreshPromise는 전역 변수가 아닌 클로저 변수로 사용
            refreshPromise = (async()=>{
                const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                const refreshToken = getRefreshToken();

                const {data} = await axiosInstance.post("/v1/auth/refresh", {refresh: refreshToken});

                const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

                const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

                setAccessToken(data.data. accessToken);
                setRefreshToken(data.data. refreshToken);

                return data.data. accessToken;
            }) ()
                    
                .catch((error) => {
                    const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    removeAccessToken();
                    removeRefreshToken();
                    
        }).finally(() => {
                    refreshPromise = null;
                });
        }
        
        return refreshPromise.then((newAccessToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosInstance.request(originalRequest);
        })
        
    }
    
    return Promise.reject(error);
  }
);



export default axiosInstance;


