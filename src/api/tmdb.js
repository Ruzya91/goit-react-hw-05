import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDQ5YzZiNzIyYzgxZjEwM2JhZDBmMWZhZTZiZjk4YSIsIm5iZiI6MTc0NzIzOTQyNC4wOCwic3ViIjoiNjgyNGMyMDAyMTg2ZDVhZTdlYWQ5ZTNhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.jpQ7e9Tcvze0intkjFiuUrJArwSCFbKRC2q-FomJYA0";

const options = {
  headers: {
    Authorization: ACCESS_TOKEN,
  },
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await axios.get(
    `${BASE_URL}/search/movie?query=${query}`,
    options
  );
  return data.results;
};
export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
  return response.data;
};

export const fetchMovieDetails = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return data;
};

export const fetchMovieCast = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return data.cast;
};

export const fetchMovieReviews = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return data.results;
};
