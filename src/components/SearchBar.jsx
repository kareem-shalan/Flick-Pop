import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center align-items-center gap-2"
    >
      <input
        type="text"
        className="form-control w-50"
        placeholder="Search for movies or TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn btn-warning fw-bold">
        Search
      </button>
    </form>
  );
}
