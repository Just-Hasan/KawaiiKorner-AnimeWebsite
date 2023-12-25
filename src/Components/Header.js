import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
export function Header({ onSearch, setSearch }) {
  return (
    <header className="p-4 mt-4">
      <nav className="grid items-center justify-between grid-cols-3 gap-4 p-6 rounded-lg navbar">
        <div className="flex items-center justify-between col-span-1 text-5xl gap-x-4 font-extraboldfont-inter text-accent">
          <img
            src={`/Logo.png`}
            className="w-1/2 bg-slate-400 logo"
            alt="Kawaii Korner Logo"
          />
          <ul className="flex items-center justify-center w-full h-full text-xl gap-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Manga">Manga</Link>
            </li>
            <li>
              <Link to="/Seiyuu">Seiyuu</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-end col-span-2 gap-2 input-form-wrapper">
          <form
            className="relative flex w-2/5 input-form"
            onSubmit={(e) => onSearch(e)}
          >
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
