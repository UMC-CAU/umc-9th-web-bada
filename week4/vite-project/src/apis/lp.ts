import { type PaginationDto } from "../types/common.ts";
import axiosInstance from "./axios.ts";
import { type ResponseLpListDto } from "../types/lp.ts";
import { type Lp } from "../types/lp.ts";
import { type ApiResponse } from "./../types/api.ts";
import {
  type CreateLpRequest,
  type UpdateLpRequest,
} from "../types/lp.ts";
import { type LpListResponse } from "../types/lp.ts";
import axios from "axios";

export const getLpList = async (paginationDto: PaginationDto):Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

// Lp 세부정보
export const getLpById = async (lpId: number): Promise<Lp> => {
  const response = await axiosInstance.get<Lp>(`/v1/lps/${lpId}`)
  return response.data
}

// LP 생성
export const createLp = (payload: CreateLpRequest | FormData) => {
  if (payload instanceof FormData) {
    // FormData는 axios가 Content-Type을 자동 처리하므로 headers 생략 가능
    return axios.post('/v1/lps', payload);
  } else {
    return axios.post('/v1/lps', payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Lp 편집
export const updateLp = async (
  lpId: number,
  data: UpdateLpRequest
): Promise<ApiResponse<Lp>> => {
  const response = await axiosInstance.patch<ApiResponse<Lp>>(
    `/v1/lps/${lpId}`,
    data
  )
  return response.data
}

// LP 삭제
export const deleteLp = async (lpId: number): Promise<ApiResponse> => {
  const response = await axiosInstance.delete<ApiResponse>(`/v1/lps/${lpId}`)
  return response.data
}

// LP 좋아요
export const likeLp = async (lpId: number): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>(
    `/v1/lps/${lpId}/likes`
  )
  return response.data
}

// LP 좋아요 취소
export const unlikeLp = async (lpId: number): Promise<ApiResponse> => {
  const response = await axiosInstance.delete<ApiResponse>(
    `/v1/lps/${lpId}/likes`
  )
  return response.data
}

// 좋아요 정보 불러오기
export const getMyLikedLps = async (): Promise<LpListResponse> => {
  const response = await axiosInstance.get<LpListResponse>('/v1/lps/likes/me')
  return response.data
}

export const getUserLikedLps = async (
  userId: number
): Promise<LpListResponse> => {
  const response = await axiosInstance.get<LpListResponse>(
    `/v1/lps/likes/${userId}`
  )
  return response.data
}

// LP 생성자 확인
export const getMyLps = async (): Promise<LpListResponse> => {
  const response = await axiosInstance.get<LpListResponse>('/v1/lps/user')
  return response.data
}

export const getUserLps = async (userId: number): Promise<LpListResponse> => {
  const response = await axiosInstance.get<LpListResponse>(
    `/v1/lps/user/${userId}`
  )
  return response.data
}

// tag로 lp 찾기
export const getLpsByTag = async (tagName: string): Promise<LpListResponse> => {
  const response = await axiosInstance.get<LpListResponse>(
    `/v1/lps/tag/${tagName}`
  )
  return response.data
}