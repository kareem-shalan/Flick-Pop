import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const apiKey = import.meta.env.VITE_API_KEY || "7710c2c0a93322663cff2d25b337b96d"; 
console.log("API Key loaded:", import.meta.env.VITE_API_KEY || "7710c2c0a93322663cff2d25b337b96d"); // Add this line temporarily
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  return (
    <div className="container mt-5 pt-5" style={{ height: "100%" }}>
      <div className="p-4 bg-light border rounded text-center">
        <h2>Welcome to our movie app</h2>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
        <SearchBar />
      </div>

      <h3 className="mt-5 mb-3">Now Playing</h3>

      <div
        className="row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-5 g-3"
        style={{ minHeight: "calc(100vh - 460px)" }}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center w-100">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <div className="col" style={{ height: "100%" }} key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No results found.</p>
        )}
      </div>

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

