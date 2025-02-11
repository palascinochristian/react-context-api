import Nav from "./Nav";
import { useLocation } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext";

export default function Header() {
  const location = useLocation();
  const { search, setSearch } = useSearchContext();

  return (
    <header className="nav">
      <Nav />
      {location.pathname === "/recipes" && (
        <input
          className="searchbar"
          type="search"
          placeholder="Cerca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
    </header>
  );
}
