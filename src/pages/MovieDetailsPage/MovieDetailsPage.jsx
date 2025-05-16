import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../../api/tmdb";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getMovieDetails(movieId)
      .then((data) => {
        console.log("Movie details:", data);
        setMovie(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load movie details");
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  const backLink = location.state?.from || "/movies";

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie data found</div>;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div>
      <Link to={backLink}>🔙 Go back</Link>

      <h1>{movie.title}</h1>

      {posterUrl && (
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          width="300"
          style={{ marginBottom: "20px" }}
        />
      )}

      <p>
        <strong>Release date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>

      <ul>
        <li>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
