import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

const MyPage = ( ) => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null)
    useEffect( () => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response)
        };

        getData();
    }, []);

    if (!data?.data) {
    return <div>Loading...</div>;
  }

    return (
    <div className="flex justify-center mt-10">
      <div className="bg-white border shadow-md rounded-md p-6 w-[350px]">
        <h2 className="text-xl font-semibold mb-4 text-center">내 정보</h2>
        <div className="mb-2">
          <span className="font-medium">이름: </span>
          <span>{data.data.name}</span>
        </div>
        <div>
          <span className="font-medium">이메일: </span>
          <span>{data.data.email}</span>
        </div>
      </div>
    </div>
  );
};

export default MyPage;