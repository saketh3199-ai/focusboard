// A controlled input. The parent owns the text, this component only shows it.
function SearchBar({ value, onChange })
{
  const SearchBarJsx =
  <div>
    <label htmlFor="search">Search tasks</label>
    <input id="search" type="text" placeholder="Find a task..." value={value} onChange={(event) => onChange(event.target.value)}/>
  </div>

  return SearchBarJsx
}

export default SearchBar;