import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { useAnimeData } from "../App";
import SpinningRing from "./LoadingAnimation/SpinningRing";
export function UpcomingAnimeList() {
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { shortTitle, selectAnime } = useAnimeData();

  const getAPIData = async function () {
    try {
      setIsLoading(true);
      const getUpcomingAnimeData = await fetch(
        " https://api.jikan.moe/v4/seasons/upcoming"
      );
      const { data } = await getUpcomingAnimeData.json();
      setUpcomingAnime(data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAPIData();
  }, []);
  return (
    <div className="mt-12 swiper-wrapper">
      {isLoading ? (
        <SpinningRing />
      ) : (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={upcomingAnime?.length > 5 && true}
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
          {upcomingAnime.length > 5 &&
            upcomingAnime.slice(0, 10).map((anime) => {
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
                    <p className="absolute top-0 left-0 max-w-md p-4 text-3xl font-extrabold bg-opacity-50 rounded-tl-xl upcoming-anime-list-title rounded-br-xl bg-tailwindColorDark text-bright">
                      {shortTitle(anime, 1)}
                    </p>
                    <div className="absolute bottom-0 right-0 p-4 text-2xl font-black bg-opacity-50 upcoming-anime-list-desc rounded-tl-xl bg-tailwindColorDark text-bright">
                      {anime.year ?? "SOON"}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </div>
  );
}
