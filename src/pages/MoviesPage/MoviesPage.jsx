import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query.trim()) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const movies = await searchMovies(query);
        setResults(movies);
      } catch (error) {
        setError("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchValue = form.elements.query.value.trim();

    if (searchValue === "") return;

    setSearchParams({ query: searchValue });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {results.length > 0 && <MovieList movies={results} />}
    </div>
  );
};

export default MoviesPage;
