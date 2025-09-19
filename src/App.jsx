import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import Search from "./pages/Search";
import { Toaster } from "react-hot-toast";
import WatchListContext from "./context/WatchListContext";
import { useState, useRef } from "react";
import InfoPage from "./pages/InfoPage";
import "./App.css";
import toast from "react-hot-toast";

export default function App() {
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  const MAX_TOASTS = 3;
  const activeToasts = useRef([]);

  function showToast(message, type = "success") {
    if (activeToasts.current.length >= MAX_TOASTS) {
      const oldest = activeToasts.current.shift();
      toast.dismiss(oldest);
    }

    const id = toast[type](message, {
      id: `${type}-${Date.now()}`,
      duration: 2000,
      style: {
        width: "300px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: 500,
      },
      onClose: () => {
        activeToasts.current = activeToasts.current.filter((tid) => tid !== id);
      },
    });

    activeToasts.current.push(id);
  }

  const handleClick = (movie) => {
    let updatedList = [...watchlist];
    const exists = updatedList.some((m) => m.id === movie.id);

    const title =
      movie.title.length > 20 ? movie.title.slice(0, 20) + "..." : movie.title;

    if (!exists) {
      updatedList.push(movie);
      showToast(`${title} added to Watchlist ❤`, "success");
    } else {
      updatedList = updatedList.filter((m) => m.id !== movie.id);
      showToast(`${title} removed from Watchlist 💔`, "error");
    }

    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  return (
    <WatchListContext.Provider value={{ watchlist, handleClick }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/movie/:id" element={<InfoPage />} />
          <Route path="/search" element={<Search />} />
        </Routes>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              width: "300px",
              height: "60px",
              borderRadius: "8px",
              padding: "12px",
            },
          }}
        />
      </BrowserRouter>
    </WatchListContext.Provider>
  );
}
