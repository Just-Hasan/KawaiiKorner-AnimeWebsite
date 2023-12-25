import { Link } from "react-router-dom";
import { useAnimeData } from "../App";

export function Anime({ anime }) {
  const { shortTitle } = useAnimeData();
  const animeTitle = shortTitle(anime);
  return (
    <li className="cursor-pointer anime">
      <Link to={`/Anime/${anime?.mal_id}`}>
        <img
          src={anime.images.webp.image_url}
          alt={anime.images.webp.image_url}
          className="anime-image"
        />
        <span className="anime-title">{animeTitle}</span>
      </Link>
    </li>
  );
}
