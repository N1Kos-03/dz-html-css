import styles from './Card.module.css';
import { Link } from 'react-router-dom';

function Card({ movies, isSearchPerformed }) {
  // Демонстрационный список фильмов (показывается только до первого поиска)
  const filmList = [
    { number: '324', img: './public/poster/blackwidow.png', title: 'Black Widow' },
    { number: '124', img: './public/poster/shangchi.png', title: 'Shang Chi' },
    { number: '235', img: './public/poster/loki.png', title: 'Loki' },
    { number: '123', img: './public/poster/how.png', title: 'How I Met Your Mother' },
    { number: '8125', img: './public/poster/money.png', title: 'Money Heist' },
    { number: '123', img: './public/poster/friends.png', title: 'Friends' },
    { number: '12', img: './public/poster/big.png', title: 'The Big Bang Theory' },
    { number: '456', img: './public/poster/two.png', title: 'Two And a Half Men' },
  ];

  // Если поиск уже был → показываем только movies
  // Если поиска не было → показываем примеры
  const listToRender = isSearchPerformed ? movies : filmList;

  if (isSearchPerformed && (!movies || movies.length === 0)) {
    return <p>Ничего не найдено</p>;
  }

  return (
    <div className={styles['card-list']}>
      {listToRender.map((film, index) => (
        <div key={index} className={styles['card-body']}>
          <div className={styles['rating']}>
            <img src="/rating.svg" alt="Рейтинг" />
            <p className={styles['rating-number']}>
              {film['#RANK'] || film.number || '—'}
            </p>
          </div>

          <Link to={film['#IMDB_ID'] ? `/movie/${film['#IMDB_ID']}` : '#'}>
            <img
              src={film['#IMG_POSTER'] || film.img}
              alt={film['#TITLE'] || film.title}
              className={styles['poster-img']}
            />
          </Link>

          <h3>{film['#TITLE'] || film.title}</h3>
          <p>{film['#YEAR'] || ''}</p>

          <div className={styles['like']}>
            <img src="/like.svg" alt="Избранное" />
            <p className={styles['like-p']}>В избранное</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
