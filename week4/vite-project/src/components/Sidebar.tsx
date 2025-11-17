import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="h-full flex flex-col">
      {/* 상단 타이틀 */}
      <div className="px-4 py-4 border-b">
        <h2 className="text-lg font-semibold">Menu</h2>
      </div>

      {/* 메뉴 리스트 */}
      <ul className="flex-1 px-2 py-4 space-y-1">
        <li>
          <Link
            to="/search"
            className="block px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            찾기
          </Link>
        </li>

        <li>
          
          <Link
      to={"/my"}
      className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
    >
      마이 페이지
    </Link>
        </li>
      </ul>

      {/* 하단 */}
      <div className="px-4 py-4 border-t text-sm text-gray-500">
        © 2025 My App
      </div>
    </nav>
  );
};

export default Sidebar;
