import { FaHeart } from "react-icons/fa";
import WatchListContext from "../context/WatchListContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const imgBase = "https://image.tmdb.org/t/p/w500";
  const { handleClick, watchlist } = useContext(WatchListContext);

  const inWatchlist = watchlist.some((m) => m.id === movie.id);

  const getRateColor = (rate) => {
    if (rate >= 70) return "#21d07a";
    if (rate >= 50) return "#d2d531";
    return "#db2360";
  };

  const rate = Math.round((movie.vote_average || 0) * 10);

  return (
    <div className="card h-100 border-0 shadow-sm movie-card">
      <div className="position-relative">
        <Link to={`/movie/${movie.id}`}> 
          <img
            src={
              movie.poster_path
                ? imgBase + movie.poster_path
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            className="card-img-top rounded"
            style={{ height: "100%", maxHeight: "550px", cursor: "pointer", width: "100%" }}
            alt={movie.title || movie.name}
          />
        </Link>
        <div
          className="position-absolute"
          style={{
            bottom: "-15px",
            left: "5px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#081c22",
            border: `3px solid ${getRateColor(rate)}`,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          {rate}%
        </div>
      </div>

      <div className="card-body">
        <h5
          className="card-title movie-title"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {movie.title || movie.name} {}
        </h5>
        <div className="d-flex justify-content-between align-items-center p-2">
          <p className="text-muted small mb-0">
            {movie.release_date || movie.first_air_date}
          </p>
          <FaHeart
            size={18}
            color={inWatchlist ? "red" : "gray"}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(movie)}
          />
        </div>
      </div>
    </div>
  );
}