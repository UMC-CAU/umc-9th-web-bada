import { type Movie } from "../types/movie";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
}

const Modal = ({ isOpen, onClose, movie }: ModalProps) => {
  if (!isOpen || !movie) return null;

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "http://via.placeholder.com/640x480";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-11/12 max-w-3xl rounded-lg bg-white shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 rounded bg-gray-200 px-3 py-1 font-bold hover:bg-gray-300"
          onClick={onClose}
        >
          닫기
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage}
            alt={`${movie.title} 포스터`}
            className="h-80 w-56 flex-shrink-0 rounded-lg object-cover shadow-md"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-gray-800">{movie.title}</h2>
              <p className="mb-1 text-sm text-gray-600">
                평점: {movie.vote_average.toFixed(1)} | {movie.release_date}
              </p>
              <p className="text-sm text-gray-700">{movie.overview}</p>
            </div>

            <a
              href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-600"
            >
              IMDb에서 검색하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
