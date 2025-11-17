import { type Lp } from "../../types/lp";
import { useNavigate } from "react-router-dom";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lp/${lp.id}`);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={handleClick}
    >
      {/* 썸네일 */}
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-48 object-cover"
      />

      {/* 항상 보이는 제목 (하단) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 z-10 transition-all duration-300 group-hover:bg-opacity-90">
        <h3 className="text-white text-sm font-semibold">{lp.title}</h3>

        {/* hover 시 나타나는 추가 정보 */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 text-xs text-gray-300">
          <p>업로드: {new Date(lp.createdAt).toLocaleDateString()}</p>
          <p>좋아요: {lp.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
