import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { useAnimeData } from "../App";
export function TopAnimeList() {
  const [topAnime, setTopAnime] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const { shortTitle, selectAnime } = useAnimeData();
  const getTopAnimeData = async function () {
    const getAPIData = await fetch("https://api.jikan.moe/v4/top/anime");
    const { data } = await getAPIData.json();
    setTopAnime(data);
    setDataFetched(true);
  };
  useEffect(() => {
    getTopAnimeData();
  }, []);

  return (
    <div className="pt-4 mt-12">
      {dataFetched && (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          speed={1500}
          direction={`horizontal`}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {topAnime?.slice(0, 5).map((anime) => {
            return (
              <SwiperSlide className="relative" key={anime.mal_id}>
                <div
                  className="card-swiper-container"
                  onClick={() => selectAnime(anime)}
                >
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                  />
                  <p className="absolute top-0 left-0 p-4 text-3xl font-extrabold bg-opacity-50 w-max rounded-br-xl bg-tailwindColorDark text-accent">
                    {shortTitle(anime)}
                  </p>
                  <p className="absolute bottom-0 right-0 p-4 text-2xl font-black rounded-br-2xl rounded-tl-xl bg-accent text-shades">
                    {anime.score}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
