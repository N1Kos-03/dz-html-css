import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`https://search.imdbot.workers.dev/?tt=${id}`);
        const data = await res.json();
        setMovie(data.short || {});
      } catch (e) {
        console.error("Ошибка при загрузке фильма", e);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!movie) return <p>Фильм не найден</p>;

  // ищем русский перевод среди других названий
  let russianTitle = "";
  if (movie.otherTitles) {
    russianTitle = movie.otherTitles.find((t) => /[а-яё]/i.test(t));
  }

  return (
    <div>
      <h1>{movie.name}</h1>
      {russianTitle && <h2>{russianTitle}</h2>}
      {movie.image && <img src={movie.image} alt={movie.name} />}
      <p>{movie.description}</p>
      <p>Год: {movie.datePublished}</p>
      <p>Оценка: {movie.aggregateRating?.ratingValue}</p>
    </div>
  );
}

export default Movie;
