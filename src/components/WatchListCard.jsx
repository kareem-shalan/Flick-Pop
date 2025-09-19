import { FaHeart } from "react-icons/fa";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import WatchListContext from "../context/WatchListContext";


function WatchListCard({ movie }) {
        const imgBasePoster = "https://image.tmdb.org/t/p/w500"
        const imgBaseBackdrop = "https://image.tmdb.org/t/p/original"
        const { watchlist, handleClick } = useContext(WatchListContext);
        const [expanded, setExpanded] = useState({});

        const renderStars = (vote) => {
            const stars = Math.round(vote / 2);
            return "★".repeat(stars) + "☆".repeat(5 - stars);
        };

        const isInWatchlist = watchlist.some((m) => m.id === movie.id);

    return (
        <div className="watch-card d-flex flex-column flex-sm-row flex-md-column flex-lg-row border rounded p-4 shadow-sm h-100 position-relative overflow-hidden"
        style={{
            backgroundImage: movie.backdrop_path
            ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${imgBaseBackdrop}${movie.backdrop_path})`
            : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
            color: "white",
        }}>
            <div
            className="img-container me-0 me-sm-3 me-md-0 me-lg-3 mb-3 mb-sm-0 mb-md-3 mb-lg-0 position-relative"
            style={{ flex: "0 0 200px" }}
            >
                <Link to={`/movie/${movie.id}`}>
                    <img
                        src={`${imgBasePoster}${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded w-100"
                        style={{
                        height: "100%",
                        objectFit: "cover",
                        }}
                    />
                </Link>

                <FaHeart
                    size={25}
                    color={isInWatchlist ? "red" : "gray"}
                    className="heart-animate d-none d-md-block d-lg-none"
                    style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "15px",
                    right: "10px",
                    background: "rgba(124, 75, 67, 0.5)",
                    border: "rgba(170, 133, 133, 1) solid 1px",
                    backdropFilter: "blur(10px)",
                    borderRadius: "50%",
                    padding: "5px",
                    zIndex: "2",
                    boxShadow: "0 0 20px 4px rgba(123, 68, 68, 1)",
                    }}
                    onClick={() => handleClick(movie)}
                />
            </div>

            <div className="flex-grow-1 d-flex flex-column overflow-hidden">
                <div className="d-flex justify-content-between align-items-start">
                    <h4
                    className="mb-0 text-truncate"
                    style={{ maxWidth: "calc(100% - 40px)" }}
                    >
                    {movie.title}
                    </h4>

                    <FaHeart
                    size={22}
                    color={isInWatchlist ? "red" : "gray"}
                    className="heart-animate d-block d-md-none d-lg-block"
                    style={{
                        cursor: "pointer",
                        background: "rgba(167, 167, 167, 0.35)",
                        borderRadius: "50%",
                        padding: "5px",
                        margin: '5px',
                        boxShadow: "0 0 10px 2px rgba(95, 95, 95, 0.3)",
                        zIndex: "2",
                    }}
                    onClick={() => handleClick(movie)}
                    />
                </div>

                <p className="mb-1" style={{ color: "rgba(255, 255, 255, 0.82)" }}>Release Date: {movie.release_date}</p>
                <p className="mb-1">
                    <span className="text-warning fs-5">
                    {renderStars(movie.vote_average)}{" "}
                    <small className="fs-6" style={{ color: "rgba(255, 255, 255, 0.82)" }}>
                        (<span className="fw-bold" style={{ color: "white" }}>{movie.vote_count}</span> votes)
                    </small>
                    </span>
                </p>

                <p className="flex-grow-1"> 
                    {expanded[movie.id] ? movie.overview 
                    : movie.overview.length > 181 
                    ? movie.overview.slice(0, 181) + "..." 
                    : movie.overview
                    } 
                </p>

                {movie.overview.length > 181 && (
                    <button
                        onClick={() =>
                            setExpanded((prev) => ({
                            ...prev,
                            [movie.id]: !prev[movie.id],
                            }))
                        }
                        className={`glass-btn ${expanded[movie.id] ? "active" : ""}`}
                        >
                        {expanded[movie.id] ? (
                            <>
                            View Less <RxCaretUp className="ms-1" />
                            </>
                        ) : (
                            <>
                            View More <RxCaretDown className="ms-1" />
                            </>
                        )}
                    </button>

                )}
            </div>
        </div>
    );
}

export default WatchListCard