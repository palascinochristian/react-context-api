import { createContext, useState, useContext } from "react";

//Mi creo il contesto
const SearchContext = createContext();

// Creo il provider
function SearchProvider({ children }) {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

//hook custom per il consumo
function useSearchContext() {
  const context = useContext(SearchContext);
  return context;
}

export { SearchProvider, useSearchContext };
