import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

const apiKey = import.meta.env.VITE_API_KEY || "7710c2c0a93322663cff2d25b337b96d";

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query") || "";
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    setPage(1);
    setSearchTerm(query);
  }, [query]);

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results || []);
        setTotalPages(data.total_pages || 1);
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate(`/`);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-5 pt-5">
      <form onSubmit={handleSearch} className="mb-4 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn btn-warning fw-bold">
          Search
        </button>
      </form>

      <h4 className="mb-4">
        {results.length > 0
          ? `Search Results for: "${query}"`
          : `No results for: "${query}"`}
      </h4>

      {results.length === 0 ? (
        <p>No movies found 😔</p>
      ) : (
        <div className="row g-3">
          {results.map((movie) => (
            <div className="col-6 col-md-3 col-lg-2" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {results.length > 0 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
}
