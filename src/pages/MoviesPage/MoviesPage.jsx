import { useState } from "react";
import { searchMovies } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const movies = await searchMovies(query);
      setResults(movies);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={results} />
    </div>
  );
};

export default MoviesPage;
