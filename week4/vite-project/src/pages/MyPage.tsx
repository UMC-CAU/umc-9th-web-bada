import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";



const MyPage = ( ) => {
  const navigate = useNavigate();
  const {logout} = useAuth();

    const [data, setData] = useState<ResponseMyInfoDto>([]);
    useEffect( () => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response)
        };

        getData();
    }, []);

    const handleLogout = async () => {
      await logout();
      navigate("/");
    }


    return (
    <div className="flex justify-center mt-10">
      <div className="bg-white border shadow-md rounded-md p-6 w-[350px]">
        <h2 className="text-xl font-semibold mb-4 text-center">내 정보</h2>
        <div className="mb-2">
          <span className="font-medium">이름: </span>
          <span>{data.data?.name}</span>
        </div>
        <div>
          <span className="font-medium">이메일: </span>
          <span>{data.data?.email}</span>
        </div>
        <button className='cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90'
         onClick = {handleLogout}>로그아웃</button>
      </div>
    </div>
  );
};

export default MyPage;