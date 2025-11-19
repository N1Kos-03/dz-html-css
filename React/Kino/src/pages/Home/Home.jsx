import { useState } from 'react';
import Search from '../../components/Search/Search.jsx';
import Card from '../../components/Card/Card.jsx';

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    setError("");
    setIsSearchPerformed(true);

    try {
      const res = await fetch(`https://search.imdbot.workers.dev/?q=${query}`);
      const data = await res.json();

      if (!data.description || data.description.length === 0) {
        setError("Ничего не найдено");
        setMovies([]);
      } else {
        const searchQuery = query.toLowerCase().trim();

        // 🔹 Нормализация названия
        const normalizeTitle = (title) => {
          return title
            .replace(/\s*\(\d{4}[^\)]*\)/g, '')
            .replace(/[^\wа-яёА-ЯЁ\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
        };

        // 🔹 Проверка языка названия
        const hasOnlyEnglishOrRussian = (title) => {
          const hasRussian = /[а-яёА-ЯЁ]/.test(title);
          const hasEnglish = /[a-zA-Z]/.test(title);
          const hasOtherLanguages = /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/.test(title);
          
          return (hasEnglish || hasRussian) && !hasOtherLanguages;
        };

        // 🔹 Проверка на мусорный контент
        const isJunk = (item) => {
          const title = (item["#TITLE"] || "").toLowerCase();
          
          // Ключевые слова мусора в названии
          const junkInTitle = [
            ": episode",
            "- episode", 
            "cast interview",
            "movie review",
            "film review",
            "red carpet",
            "press conference",
            "behind the scenes",
            "making of",
            "deleted scene",
            "bloopers",
            "gag reel",
            "featurette",
            "tv spot",
            "sneak peek",
            "official trailer",
            "official clip"
          ];

          return junkInTitle.some(kw => title.includes(kw));
        };

        // 🔹 Фильтрация результатов
        const filtered = data.description
          .filter((item) => {
            // Должны быть базовые данные
            if (!item["#YEAR"] || !item["#IMG_POSTER"]) return false;

            const title = item["#TITLE"] || "";

            // Проверяем язык названия
            if (!hasOnlyEnglishOrRussian(title)) return false;

            // Исключаем явный мусор
            if (isJunk(item)) return false;

            const normalizedTitle = normalizeTitle(title);
            const normalizedQuery = normalizeTitle(searchQuery);

            // Название должно содержать запрос
            return normalizedTitle.includes(normalizedQuery);
          })
          // Сортировка по релевантности и рейтингу
          .sort((a, b) => {
            const titleA = normalizeTitle(a["#TITLE"] || "");
            const titleB = normalizeTitle(b["#TITLE"] || "");
            const normalizedQuery = normalizeTitle(searchQuery);

            // Точное совпадение
            const aExact = titleA === normalizedQuery;
            const bExact = titleB === normalizedQuery;
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;

            // Начинается с запроса
            const aStarts = titleA.startsWith(normalizedQuery);
            const bStarts = titleB.startsWith(normalizedQuery);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            // По рейтингу
            return (b["#RANK"] || 0) - (a["#RANK"] || 0);
          })
          // 🔹 Берём только топ-20 результатов (самые релевантные)
          .slice(0, 20);

        if (filtered.length === 0) {
          setError("Фильмы не найдены");
          setMovies([]);
        } else {
          setMovies(filtered);
        }
      }
    } catch (e) {
      setError("Ошибка при загрузке");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      <Card movies={movies} isSearchPerformed={isSearchPerformed} />
    </>
  );
}

export default Home;