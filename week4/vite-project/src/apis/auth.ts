import axios from "axios";
import {type RequestSignupDto, type RequestSigninDto, type ResponseSigninDto, type ResponseSignupDto, type ResponseMyInfoDto} from "../types/auth.ts";
import axiosInstance from "./axios";
//import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post(
         "v1/auth/signup",
        body,
    );

    return data;
};

export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post(
         "v1/auth/signin",
        body,
    );

    return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const token = localStorage.getItem("accessToken");
    return axios.get("https://umc-web.kyeoungwoon.kr/v1/users/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.data);
};
