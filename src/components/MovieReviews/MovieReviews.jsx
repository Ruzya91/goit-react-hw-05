import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api/tmdb";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews).catch(console.error);
  }, [movieId]);

  return (
    <ul>
      {reviews.length ? (
        reviews.map((review) => (
          <li key={review.id}>
            <p>
              <strong>{review.author}</strong>
            </p>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </ul>
  );
};

export default MovieReviews;
