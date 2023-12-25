/////////////////////////////////////[Component]

import { Anime } from "../Components/Anime.js";
import Main from "../Components/Main";

import { AnimeList } from "../Components/AnimeList";
/////////////////////////////////////[CSS]
import "../App.css";

/////////////////////////////////////[Swiper Essential & Other 3rd party library]
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Home() {
  return (
    <>
      <Main>
        <AnimeList>
          <Anime />
        </AnimeList>
      </Main>
    </>
  );
}
