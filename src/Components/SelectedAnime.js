import { useState, useEffect } from "react";
import { useAnimeData } from "../App";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaQuestion } from "react-icons/fa";
import { TbFileSad } from "react-icons/tb";
export function SelectedAnime() {
  const { selectedAnime, setSelectedAnime } = useAnimeData();
  const [animeCharacter, setAnimeCharacter] = useState([]);
  const [animeStreamingLink, setAnimeStreamingLink] = useState([]);

  const getAnimeDatas = async function () {
    const getAnimeCharacterAPI = await fetch(
      `https://api.jikan.moe/v4/anime/${selectedAnime.mal_id}/characters`
    );
    const getAnimeStreamingAPI = await fetch(
      `https://api.jikan.moe/v4/anime/${selectedAnime.mal_id}/streaming`
    );
    const { data: AnimeCharacter } = await getAnimeCharacterAPI.json();
    const { data: AnimeStreamingData } = await getAnimeStreamingAPI.json();
    setAnimeCharacter(AnimeCharacter);
    setAnimeStreamingLink(AnimeStreamingData);
  };

  useEffect(() => {
    getAnimeDatas();
  }, [selectedAnime]);
  console.log(animeStreamingLink);
  return (
    <>
      <div className="selected-anime-container scrollbar-thin scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-200 mt-12   px-4 pt-4 text-[#f4f4f4]">
        <div className="selected-anime grid grid-cols-[35fr,65fr] gap-x-4">
          <div className="relative selected-anime-image">
            <img
              src={selectedAnime.images.jpg.large_image_url}
              className="object-cover w-full h-full selected-anime-img rounded-2xl"
              alt={selectedAnime.title}
            />
          </div>
          <div className="selected-anime-information  relative grid grid-cols-[auto,auto,1fr] gap-x-4 gap-y-6 rounded-2xl bg-tailwindColorGray p-4 text-3xl">
            <p className="font-black">Title</p>
            <p className="font-black">:</p>
            <p className="font-black text-left">{selectedAnime.title}</p>
            {/*  */}
            <p className="">Episodes</p>
            <p className="">:</p>
            <p className="">{selectedAnime.episodes || "To Be Announced"}</p>
            {/*  */}

            <p className="">Score</p>
            <p className="">:</p>
            <p className="">{selectedAnime?.score || "Not Rated"}</p>
            {/*  */}

            <p className="">Duration</p>
            <p className="">:</p>
            <p className="">{selectedAnime?.duration}</p>
            {/*  */}

            <p className="">User Rank</p>
            <p className="">:</p>
            <p className="">{selectedAnime?.rank || "Not decided yet"}</p>
            {/*  */}
            <p className="">Status</p>
            <p className="">:</p>
            <p className="">{selectedAnime?.status}</p>
            {/*  */}

            <p className="">Favourites</p>
            <p className="">:</p>
            <p className="text-left ">{selectedAnime.favorites}</p>
            {/*  */}

            <p className="">Popularity</p>
            <p className="">:</p>
            <p className="">{selectedAnime.popularity}</p>
            {/*  */}

            <p className="">Rating</p>
            <p className="">:</p>
            <p className="">{selectedAnime.rating || "Not rated yet"}</p>
            {/*  */}

            <p className="">Genres</p>
            <p className="">:</p>
            <p className="">
              {selectedAnime.genres.map((genre, i, arr) => {
                return (
                  <span key={i}>
                    {genre.name}
                    {i < arr.length - 1 ? ", " : ""}
                  </span>
                );
              })}
            </p>
            {/*  */}

            <p className="">Source</p>
            <p className="">:</p>
            <p className="">{selectedAnime.source}</p>
            {/*  */}

            <p className="">Year</p>
            <p className="">:</p>
            <p className="">{selectedAnime.year || "To be announced"}</p>
            {/*  */}

            <p className="">Studio</p>
            <p className="">:</p>
            <p className="">
              {selectedAnime.studios.map((studio, i, arr) => {
                return (
                  <span key={studio.mal_id}>
                    {studio.name}
                    {i < arr.length - 1 ? ", " : ""}
                  </span>
                );
              })}
            </p>
            {/*  */}
            <button
              className="absolute top-0 right-0 p-4 text-5xl font-black text-accent"
              onClick={() => setSelectedAnime(null)}
            >
              <IoMdCloseCircleOutline />
            </button>
          </div>
          <div className="col-span-2 mt-14">
            <h2 className="mb-6 text-3xl font-black text-center">Synopsis</h2>
            <p className="leading-{15px} text-2xl">{selectedAnime.synopsis}</p>
          </div>
          <div className="col-span-2 mt-14">
            <h2 className="mb-6 text-3xl font-black text-center">Trailer</h2>
            {selectedAnime.trailer.embed_url ? (
              <iframe
                width={"50%"}
                height={"360px"}
                className="ml-auto mr-auto rounded-2xl anime-trailer"
                src={selectedAnime.trailer.embed_url}
                allowFullScreen
                title="Anime Trailer"
              ></iframe>
            ) : (
              <div className="ml-auto mr-auto grid h-[360px] w-1/2 anime-no-trailer place-content-center rounded-2xl bg-tailwindColorGray">
                <TbFileSad className="w-full text-center text-[80px]" />
                <h3 className="text-3xl font-black">Trailer not available</h3>
              </div>
            )}
          </div>
          <div className="col-span-2 mt-14">
            <h2 className="mb-6 text-3xl font-black text-center">Streaming</h2>
            <div
              className="grid justify-center w-full grid-cols-3 overflow-hidden bg-tailwindColorGray rounded-xl"
              style={{ outline: "1px solid #60d6ff" }}
            >
              {animeStreamingLink.length > 0 ? (
                animeStreamingLink.map((streamingLink, i) => {
                  return (
                    <a
                      style={{ outline: "1px solid #60d6ff", width: "100%" }}
                      href={streamingLink.url}
                      key={streamingLink.name}
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 text-2xl text-center justify-self-center hover:text-[#60d6ff] font-bold"
                    >
                      {streamingLink.name}
                    </a>
                  );
                })
              ) : (
                <p className="col-span-3 p-4 text-2xl font-black text-center">
                  No Link Yet
                </p>
              )}
            </div>
          </div>
          <div className="col-span-2 mt-14">
            <h2 className="mb-6 text-3xl font-black text-center">Characters</h2>
            <div className="grid w-full grid-cols-5 gap-4 text-center anime-char-container">
              {animeCharacter.length !== 0 ? (
                animeCharacter.slice(0, 6).map((character) => {
                  return (
                    <Character
                      char={character}
                      key={character.character.mal_id}
                    />
                  );
                })
              ) : (
                <NoCharacter />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function Character({ char }) {
  function reverseName(str) {
    const reversedName = str.split(",").reverse().join(" ");
    return reversedName;
  }
  let characterName;
  if (char) {
    characterName = char.character.name.includes(",")
      ? reverseName(char.character.name)
      : char.character.name;
  }
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <a href={char.character.url} target="_blank" rel="noreferrer">
        <span className="h-[300px]">
          <img
            src={char?.character.images.webp.image_url}
            className={`h-full w-full object-cover`}
            alt={char?.character.name}
          />
        </span>
      </a>
      <p className="absolute bottom-0 left-0 w-full p-4 text-xl font-bold bg-tailwindColorGray bg-opacity-60 text-bright">
        {characterName}
      </p>
    </div>
  );
}

function NoCharacter() {
  return (
    <div className="col-span-full grid h-[300px] w-full place-content-center rounded-2xl bg-tailwindColorGray">
      <FaQuestion className="h-full w-max p-4 text-[120px] text-accent" />
      <h2>No Data Found</h2>
    </div>
  );
}
