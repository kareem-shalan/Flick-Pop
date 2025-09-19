export default function Pagination({ page, setPage, totalPages }) {
  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button
            className={`page-link ${
              page === 1 ? "bg-light text-muted" : "bg-warning text-black"
            }`}
            onClick={() => {
              setPage(page - 1);
              window.scrollTo(0, 0);
            }}
            disabled={page === 1}
          >
            Prev
          </button>
        </li>

        <li className="page-item ">
          <span className="page-link">
            <span style={{color:"#d4ad0fff"}}>{page}</span> <small className="text-muted">/ {totalPages}</small>
          </span>
        </li>

        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button
            className={`page-link ${
              page === totalPages ? "bg-light text-muted" : "bg-warning text-black"
            }`}
            onClick={() => {
              setPage(page + 1);
              window.scrollTo(0, 0);
            }}
            disabled={page === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
