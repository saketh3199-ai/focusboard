import { Search } from "lucide-react";

// A controlled input. The parent owns the text, this component only shows it.
function SearchBar({ value, onChange })
{
  const SearchBarJsx =
  <div className="search">
    <label htmlFor="search" className="visually-hidden">Search tasks</label>
    <Search className="search__icon" aria-hidden="true"/>
    <input id="search" className="search__input" type="text" placeholder="Find a task..." value={value} onChange={(event) => onChange(event.target.value)}/>
  </div>

  return SearchBarJsx
}

export default SearchBar;