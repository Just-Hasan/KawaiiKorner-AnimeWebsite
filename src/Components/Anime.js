import { useAnimeData } from "../App";

export function Anime({ anime }) {
  const { shortTitle, selectAnime } = useAnimeData();
  const animeTitle = shortTitle(anime);
  return (
    <li
      className="cursor-pointer anime"
      onClick={() => {
        return selectAnime(anime);
      }}
    >
      <img
        src={anime.images.webp.image_url}
        alt={anime.images.webp.image_url}
        className="anime-image"
      />
      <span className="anime-title">{animeTitle}</span>
    </li>
  );
}
