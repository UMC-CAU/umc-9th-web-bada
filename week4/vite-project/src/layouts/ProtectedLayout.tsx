import { useAuth } from "../context/AuthContext.tsx";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  // useAuth()에서 accessToken을 가져옵니다.
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }
  
  // accessToken이 있으면 중첩된 라우트의 컴포넌트(Outlet)를 렌더링
  return <Outlet />;
};

export default ProtectedLayout;