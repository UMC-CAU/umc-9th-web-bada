import { type CursorBasedResponse } from "./common.ts";
import type { ApiResponse } from "./api.ts";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;


export interface LpListData {
  data: Lp[]
  nextCursor: number | null
  hasNext: boolean
}

export type LpListResponse = ApiResponse<LpListData>

export type LpDetailResponse = ApiResponse<Lp>

export interface CreateLpRequest {
  title: string
  content: string
  thumbnail: string
  tags: string[]
  published: boolean
}

export interface UpdateLpRequest {
  title?: string
  content?: string
  thumbnail?: string
  tags?: string[]
  published?: boolean
}

export interface GetLpsParams {
  cursor?: number
  limit?: number
  search?: string
  order?: 'asc' | 'desc'
}