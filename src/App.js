import React, { useState, useEffect, useContext } from "react";

/////////////////////////////////////[Component]
import { Header } from "./Components/Header";

import { Anime } from "./Components/Anime.js";

import Main from "./Components/Main";
/////////////////////////////////////[CSS]
import "./App.css";

/////////////////////////////////////[Swiper Essential & Other 3rd party library]
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { AnimeList } from "./Components/AnimeList";

/////////////////////////////////////[Context Variable]
const AnimeContextData = React.createContext();

export function useAnimeData() {
  return useContext(AnimeContextData);
}

export default function App() {
  const [anime, setAnime] = useState({});
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  /////////////////////////////////////[Handler Functions: Search]
  function handleSearch(e) {
    e.preventDefault();
    setSearchValue(() => search);
    setError("");
    setSelectedAnime(null);
    setSearch("");
  }

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
    <div className="w-4/5 mx-auto app-container">
      <Header onSearch={handleSearch} setSearch={setSearch} />
      <AnimeContextData.Provider value={AnimeContextValue}>
        <Main>
          <AnimeList>
            <Anime />
          </AnimeList>
        </Main>
      </AnimeContextData.Provider>
    </div>
  );
}
