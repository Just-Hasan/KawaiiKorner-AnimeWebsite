import { FaMagnifyingGlass } from "react-icons/fa6";

export function Header({ onSearch, setSearch }) {
  return (
    <header className="mt-6">
      <nav className="grid items-center justify-between grid-cols-3 gap-4 p-6rounded-lg ">
        <div className="col-span-1 text-5xl font-extrabold font-inter text-accent">
          <img src={`/Logo.png`} className="w-1/2" />
        </div>
        <div className="flex items-center justify-end col-span-2 gap-2">
          <form className="relative flex w-2/5 " onSubmit={(e) => onSearch(e)}>
            <input
              type="search"
              className="w-full p-4 text-2xl rounded-full outline-none bg-tailwindColorGray text-accent placeholder:text-accent focus:outline-accent"
              placeholder="Search Anime"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute p-2 text-2xl transform -translate-y-1/2 rounded-full right-2 top-1/2 bg-accent hover:bg-accent">
              <FaMagnifyingGlass className="text-3xl text-shades" />
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}
