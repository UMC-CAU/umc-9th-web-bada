import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

interface NavbarProps {
  onToggleSidebar?: () => void; // 사이드바 토글 함수
}

export const Navbar = ({ onToggleSidebar }: NavbarProps) => {
    const { accessToken, name } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        {/* 햄버거 버튼 */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 mr-4 rounded hover:bg-gray-200"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/></svg>
            </button>
          )}
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          SpinningSpinning Dolimpan
        </Link>
        <div className="space-x-6">
          {!accessToken && (
  <>
    <Link
      to={"/login"}
      className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
    >
      로그인
    </Link>
    <Link
      to={"/signup"}
      className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
    >
      회원가입
    </Link>
  </>
)
}
        </div>
        {accessToken && (
          <>
          {name &&(
    <span className="text-gray-700 dark:text-gray-300">
      환영합니다, {name}님!
    </span>
          )}
          </>
    )}
      </div>
    </nav>
  );
};
