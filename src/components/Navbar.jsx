import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-warning px-3 fixed-top">
       <Link className="navbar-brand fw-bold wave" to="/">
      {"FlickPop".split("").map((letter, i) => (
        <span key={i} className={letter === "P" || letter === "o" || letter === "p"  ? "text-danger fw-bold" : ""}>
          {letter } 
        </span>
      ))}
    </Link>
      <div className="ms-auto d-flex align-items-center">
        <Link to="/watchlist" className="btn btn-outline-dark">
          ❤️ Watchlist
        </Link>
      </div>
    </nav> 
  );
}
