import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";


const apiKey = import.meta.env.VITE_API_KEY || "7710c2c0a93322663cff2d25b337b96d";
console.log("API Key loaded:", import.meta.env.VITE_API_KEY || "7710c2c0a93322663cff2d25b337b96d"); // Add this line temporarily

export default function InfoPage() {
  const imgBasePoster = "https://image.tmdb.org/t/p/w500";
  const imgBaseBackdrop = "https://image.tmdb.org/t/p/original";

  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,credits`
    )
      .then((res) => {
        if (!res.ok) {
          toast.error(res.statusText || "Something went wrong");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message || "Something went wrong");
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, [id]);

  const userScore = useMemo(() => {
    if (!movie || !movie.vote_average) return 0;
    return Math.round(movie.vote_average * 10);
  }, [movie]);

  const scoreBorder = useMemo(() => {
    if (userScore >= 70) return "#21d07a";
    if (userScore >= 50) return "#d2d531";
    return "#db2360";
  }, [userScore]);

  const runtimeLabel = useMemo(() => {
    if (!movie || !movie.runtime) return "";
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  }, [movie]);

  const trailer = useMemo(() => {
    const list = movie?.videos?.results || [];
    for (let i = 0; i < list.length; i += 1) {
      const v = list[i];
      const isYouTube = v && v.site === "YouTube";
      const isTrailer = v && (v.type === "Trailer" || v.type === "Teaser");
      if (isYouTube && isTrailer && v.key) return v;
    }
    return null;
  }, [movie]);

  if (loading) {
    return (
      <main className="container mt-5 pt-5" aria-busy="true">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div
            className="spinner-border text-warning"
            role="status"
            aria-label="Loading"
          ></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mt-5 pt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/" className="btn btn-outline-secondary">
          ← Back to Home
        </Link>
      </main>
    );
  }

  if (!movie) return null;

  const backdropStyle = {
    backgroundImage: movie.backdrop_path
      ? `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${imgBaseBackdrop}${movie.backdrop_path})`
      : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "12px",
  };

  return (
    <main className="container mt-5 pt-4">
      <section className="p-3 p-md-4 mb-4 text-white" style={backdropStyle}>
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-md-3">
            <img
              src={
                movie.poster_path ? `${imgBasePoster}${movie.poster_path}` : ""
              }
              alt={movie.title || "Poster"}
              className="img-fluid rounded shadow-sm w-100"
            />
          </div>
          <div className="col-12 col-md-9 d-flex flex-column">
            <header>
              <h1 className="h3 h-md-2 mb-2">{movie.title}</h1>
              <p className="mb-2">
                <span className="me-2 text-warning fw-semibold">
                  {userScore}% User Score
                </span>
                {movie.release_date ? (
                  <span className="me-2">• {movie.release_date}</span>
                ) : null}
                {runtimeLabel ? (
                  <span className="me-2">• {runtimeLabel}</span>
                ) : null}
              </p>
              <div className="mb-3">
                {(movie.genres || []).map((g) => (
                  <span key={g.id} className="badge text-bg-light me-2 mb-2">
                    {g.name}
                  </span>
                ))}
              </div>
            </header>

            <div className="d-flex align-items-center mb-3">
              <div
                className="me-3"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  backgroundColor: "#081c22",
                  border: `3px solid ${scoreBorder}`,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                }}
                aria-label={`User score ${userScore} percent`}
              >
                {userScore}%
              </div>
              {trailer ? (
                <a
                  className="btn btn-warning fw-semibold"
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ Watch Trailer
                </a>
              ) : null}
              <Link to="/" className="btn btn-outline-light ms-auto">
                ← Back
              </Link>
            </div>

            {movie.overview ? (
              <section>
                <h2 className="h5">Overview</h2>
                <p className="mb-0">{movie.overview}</p>
              </section>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="h5 mb-3">Top Billed Cast</h2>
        <div className="row g-3">
          {(movie.credits?.cast || []).slice(0, 8).map((person) => (
            <article
              key={person.cast_id || person.credit_id || person.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
            >
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={
                    person.profile_path
                      ? `${imgBasePoster}${person.profile_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={person.name}
                  className="card-img-top rounded-top"
                />
                <div className="card-body p-2">
                  <h3
                    className="h6 mb-1"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {person.name}
                  </h3>
                  <p
                    className="text-muted small mb-0"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {person.character}
                  </p>
                </div>
              </div>
            </article>
          ))}
          {(!movie.credits?.cast || movie.credits.cast.length === 0) && (
            <p className="text-muted">No cast information available.</p>
          )}
        </div>
      </section>

      <aside className="row g-3 mb-5">
        <div className="col-12 col-md-6">
          <div className="p-3 border rounded h-100 bg-light">
            <h2 className="h6">Facts</h2>
            <dl className="row mb-0">
              {movie.status ? (
                <>
                  <dt className="col-4">Status</dt>
                  <dd className="col-8">{movie.status}</dd>
                </>
              ) : null}
              {movie.release_date ? (
                <>
                  <dt className="col-4">Release Date</dt>
                  <dd className="col-8">{movie.release_date}</dd>
                </>
              ) : null}
              {runtimeLabel ? (
                <>
                  <dt className="col-4">Runtime</dt>
                  <dd className="col-8">{runtimeLabel}</dd>
                </>
              ) : null}
              {typeof movie.revenue === "number" && movie.revenue > 0 ? (
                <>
                  <dt className="col-4">Revenue</dt>
                  <dd className="col-8">
                    {new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(movie.revenue)}
                  </dd>
                </>
              ) : null}
            </dl>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="p-3 border rounded h-100 bg-light">
            <h2 className="h6">Production</h2>
            <div className="d-flex flex-wrap gap-2">
              {(movie.production_companies || []).map((pc) => (
                <span key={pc.id} className="badge text-bg-secondary">
                  {pc.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
