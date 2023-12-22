import { UpcomingAnimeList } from "./UpcomingAnimeList.js";
import { TopAnimeList } from "./TopAnimeList.js";
import { AnimeList } from "./AnimeList.js";
import { useAnimeData } from "../App.js";
import { SelectedAnime } from "./SelectedAnime.js";
import "../Styles/Main.css";
export default function Main() {
  const { searchedAnime, searchValue, selectedAnime } = useAnimeData();
  console.log(selectedAnime);
  return (
    <div className="pb-5 main-container">
      <div className="sticky top-and-upcoming-anime-container top-4">
        <div className="top-animes">
          <h1 className="p-4 top-anime-container-title text-accent">
            Top Anime
          </h1>
          <TopAnimeList />
        </div>
        <div className="upcoming-animes">
          <h1 className="p-4 top-anime-container-title text-bright">
            Upcoming Anime
          </h1>
          <UpcomingAnimeList />
        </div>
      </div>
      <div className="anime-container">
        <div className="anime-container-title-wrapper">
          <div className="anime-container-title">
            {selectedAnime && <h1>{selectedAnime.title}</h1>}
            {!selectedAnime &&
              searchedAnime &&
              searchedAnime.length !== 0 &&
              searchValue === "" && <h1>Airing Anime</h1>}
            {!selectedAnime &&
              searchedAnime &&
              searchedAnime.length === 0 &&
              searchValue !== "" && (
                <h1>{`Sorry, we cannot find any results for ${searchValue}`}</h1>
              )}
            {!selectedAnime &&
              searchedAnime &&
              searchedAnime.length > 0 &&
              searchValue !== "" && (
                <h1>{`Found ${searchedAnime?.length} result for ${searchValue}`}</h1>
              )}
          </div>
        </div>
        {selectedAnime ? <SelectedAnime /> : <AnimeList />}
      </div>
    </div>
  );
}
