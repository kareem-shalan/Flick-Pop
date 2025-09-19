import { IoHeartDislikeOutline } from "react-icons/io5";
import { RxCaretLeft } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import WatchListContext from "../context/WatchListContext";
import WatchListCard from "../components/WatchListCard";

export default function WatchList() {
  const { watchlist } = useContext(WatchListContext);

  return (
    <div className="container mt-3 pt-5 pb-5">
      <div className="header d-flex flex-row align-items-center justify-content-between my-4 mx-3">
        <h2>Watch List</h2>

        <Link to={"/"} className="btn btn-warning px-4 py-2 fw-bold ">
          <div>
            <RxCaretLeft size={20} className="me-2" />  Back to Home
          </div>
        </Link>
      </div>

      {watchlist.length === 0 ? (
        <div
          className="container d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "60vh" }}
        >
          <IoHeartDislikeOutline size={150} color="lightgray" className="mb-3" />
          <h4 className="text-muted mb-2">No Movies in Watch List</h4>
        </div>
      ) : (
        <div className="row g-4">
          {watchlist.map((movie) => {
            return (
              <div className="col-12 col-md-6" key={movie.id}>
                <WatchListCard movie={movie} />
              </div>
            )
          })}
        </div>
      )}

      
    </div>
  );
}
