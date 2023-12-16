import LoadingAnimation from "./LoadingAnimation.js";
import { ErrorMessage } from "./ErrorMessage.js";
import { Anime } from "./Anime.js";
import { useAnimeData } from "../App.js";

export function AnimeList() {
  const { searchedAnime, errorMessage, isLoading } = useAnimeData();

  return (
    <ul className="grid grid-cols-4 px-4 pt-4 mt-12 text-center list-none anime-list gap-x-8 gap-y-16">
      {Object.keys(searchedAnime).length > 0 &&
        searchedAnime.map((anime) => {
          return <Anime key={anime.mal_id} anime={anime} />;
        })}
      {!isLoading && errorMessage && <ErrorMessage message={errorMessage} />}
      {isLoading && (
        <div className="flex items-center justify-center h-full loading-animation-wrapper col-span-full">
          <LoadingAnimation>
            <p className="text-2xl font-black text-accent">Loading Anime...</p>
          </LoadingAnimation>
        </div>
      )}
    </ul>
  );
}
