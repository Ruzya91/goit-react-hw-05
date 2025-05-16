import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../api/tmdb";

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast).catch(console.error);
  }, [movieId]);

  if (!cast.length) return <p>No cast info found.</p>;

  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: 0,
        listStyle: "none",
      }}
    >
      {cast.map((actor) => (
        <li
          key={actor.cast_id || actor.credit_id}
          style={{ width: "120px", textAlign: "center" }}
        >
          {actor.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              style={{
                width: "100%",
                borderRadius: "8px",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "180px",
                backgroundColor: "#ccc",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8em",
              }}
            >
              No Photo
            </div>
          )}
          <p>
            <strong>{actor.name}</strong>
          </p>
          <p style={{ fontSize: "0.85em" }}>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
