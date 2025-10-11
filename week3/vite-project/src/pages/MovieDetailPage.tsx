import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import type { MovieDetailResponse } from '../types/movie';

const MovieDetailPage = () => {
  const params = useParams();
  const movieId = params.movieId;
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}?language=ko-KR`;

  console.log('✅ MovieDetailPage 진입');
  console.log('📦 movieId:', movieId); // 영화 ID가 제대로 들어왔는지 확인

  const {
    isPending,
    isError,
    data: movieDetail,
  } = useCustomFetch<MovieDetailResponse>(url);

  

  if (isPending) {
    return <div>Loading...</div>;
  }


  if (isError) {
    return (
      <div>
        <span className="p-10 text-red-500 font-2xl">
          에러가 발생
        </span>
      </div>
    );
  }

  //null 체크
  if (!movieDetail) return null;

  
  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      {/* 배경 이미지 + 그라데이션 오버레이 */}
      <div
        className="relative rounded-lg overflow-hidden mb-10 min-h-[400px]"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>

        <div className="relative flex flex-col justify-end h-full p-6">
          <h1 className="text-5xl font-extrabold drop-shadow-lg mb-3">{movieDetail.title}</h1>
          {movieDetail.tagline && (
            <p className="italic text-gray-300 text-lg max-w-xl drop-shadow-md">"{movieDetail.tagline}"</p>
          )}

          <div className="flex space-x-6 text-sm mt-4 opacity-80">
            <span>평균 평점: {movieDetail.vote_average.toFixed(1)}</span>
            <span>개봉연도: {movieDetail.release_date?.slice(0, 4)}</span>
            <span>상영시간: {movieDetail.runtime}분</span>
            <span>장르: {movieDetail.genres.map(g => g.name).join(', ')}</span>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* 포스터 */}
        {movieDetail.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}
            alt={`${movieDetail.title} 포스터`}
            className="rounded-lg shadow-lg mx-auto md:mx-0"
          />
        )}

        {/* 줄거리 + 기본 정보 */}
        <div className="flex-1 text-gray-300">
          {/* 줄거리 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-white">줄거리</h2>
            <p>{movieDetail.overview || '줄거리 정보가 없습니다.'}</p>
          </section>

          {/* 기본 정보 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-white">기본 정보</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>개봉일:</strong> {movieDetail.release_date}</li>
              <li><strong>성인용:</strong> {movieDetail.adult ? '예' : '아니오'}</li>
              <li><strong>평점:</strong> {movieDetail.vote_average} / 10 ({movieDetail.vote_count}명 참여)</li>
              <li><strong>상태:</strong> {movieDetail.status}</li>
              <li><strong>런타임:</strong> {movieDetail.runtime}분</li>
              <li><strong>예산:</strong> ${movieDetail.budget.toLocaleString()}</li>
              <li><strong>수익:</strong> ${movieDetail.revenue.toLocaleString()}</li>
              <li><strong>언어:</strong> {movieDetail.spoken_languages.map(l => l.name).join(', ')}</li>
              <li><strong>원산지:</strong> {movieDetail.origin_country.join(', ')}</li>
            </ul>
          </section>

          {/* 제작사 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-white">제작사</h2>
            {movieDetail.production_companies.length === 0 ? (
              <p>정보 없음</p>
            ) : (
              <ul className="flex flex-wrap gap-4">
                {movieDetail.production_companies.map(company => (
                  <li key={company.id} className="flex items-center space-x-2">
                    {company.logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                        alt={company.name}
                        className="h-10 object-contain rounded"
                      />
                    )}
                    <span>{company.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* 홈페이지 */}
          {movieDetail.homepage && (
            <section className="mb-8">
              <a
                href={movieDetail.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 underline"
              >
                공식 홈페이지 바로가기 →
              </a>
            </section>
          )}
        </div>
      </div>

      {/* 출연진 리스트 (스크롤 가능) */}
      {movieDetail.credits?.cast && movieDetail.credits.cast.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-semibold mb-6 text-white">감독/출연</h2>
          <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800 py-2">
            {movieDetail.credits.cast.map(person => (
              <div key={person.id} className="flex flex-col items-center w-28 text-center text-gray-300">
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                      : '/default-profile.png'
                  }
                  alt={person.name}
                  className="rounded-full w-24 h-24 object-cover shadow-lg border-2 border-purple-600 mb-2"
                />
                <p className="font-semibold truncate">{person.name}</p>
                <p className="text-sm truncate opacity-80">{person.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MovieDetailPage;