import React, { useState, useEffect, useRef } from "react";
import { Header } from "./Components/Header";
import Footer from "./Components/Footer.js";
import Home from "./Pages/Home.js";
import { AnimeContextData } from "./App.js";

export default function App() {
  const [anime, setAnime] = useState({});
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passThirtyPercent, setPassThirtyPercent] = useState(false);
  const AppHeader = useRef(null);
  /////////////////////////////////////[Handler Functions: Search]
  function handleSearch(e) {
    e.preventDefault();
    setSearchValue(() => search);
    setError("");
    setSelectedAnime(null);
    setSearch("");
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrolledPercentage = (scrolled / scrollableHeight) * 100;
      if (scrolledPercentage >= 30) {
        setPassThirtyPercent(true);
      } else {
        setPassThirtyPercent(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [passThirtyPercent]);

  /////////////////////////////////////[Shortest anime title]
  function shortTitle(anime, minIndex = 0) {
    const shortestTitle = anime.titles
      .filter((title) => title.type !== "Japanese" && title.type !== "Korean")
      .map((anime) => anime.title)
      .sort((a, b) => a.length - b.length)
      .at(minIndex);
    return shortestTitle;
  }

  /////////////////////////////////////[Getting anime data]
  const gettingAnimeData = async function () {
    try {
      setIsLoading(true);
      let gettingAPIData;
      if (searchValue === "") {
        gettingAPIData = await fetch("https://api.jikan.moe/v4/seasons/now");
      } else {
        gettingAPIData = await fetch(
          `https://api.jikan.moe/v4/anime?q=${searchValue}`
        );
      }
      if (!gettingAPIData.ok)
        throw new Error(
          "Please check your internet connection / Try to reload the page"
        );
      const animeData = await gettingAPIData.json();
      const { data } = animeData;
      if (data.length === 0) {
        setAnime(data);
        throw new Error("Anime not found");
      }

      setIsLoading(false);
      setAnime(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  /////////////////////////////////////[Selecting anime]
  function selectAnime(anime) {
    setSelectedAnime(anime);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  useEffect(() => {
    gettingAnimeData();
  }, [searchValue]);

  const AnimeContextValue = {
    shortTitle,
    searchedAnime: anime,
    selectAnime,
    selectedAnime,
    isLoading,
    errorMessage: error,
    searchValue,
    setSelectedAnime,
  };
  return (
    <>
      <div className="relative w-4/5 mx-auto app-container" ref={AppHeader}>
        <Header onSearch={handleSearch} setSearch={setSearch} />
        <AnimeContextData.Provider value={AnimeContextValue}>
          <Home />
        </AnimeContextData.Provider>
        <button
          onClick={() =>
            AppHeader.current.scrollIntoView({ behavior: "smooth" })
          }
          className={`fixed go-up ${
            passThirtyPercent ? "active" : "not-active"
          } bottom-[10%] bg-accent text-slate-900 font-black rounded-xl p-4 z-10 text-xl right-[2.5%]`}
        >
          Go up!
        </button>
      </div>
      {!isLoading && <Footer />}
    </>
  );
}
