const STATUS_TABS = ["All","To do","In progress","Completed"];

// `children` is whatever is placed between <FilterTabs> and </FilterTabs> in the parent.
// Here it is the search box, so it can sit next to the priority dropdown.
function FilterTabs({ statusFilter, onStatusChange, priorityFilter, onPriorityChange, onReset, totalCount, children })
{
  const FilterTabsJsx =
  <div className="toolbar">
    {/* Status tabs */}
    <div className="tabs" role="group" aria-label="Filter by status">
      {
        STATUS_TABS.map
        (
          (tab) =>
          (
            <button key={tab} type="button" className={statusFilter === tab ? "tab tab--active" : "tab"} aria-pressed={statusFilter === tab} onClick={() => onStatusChange(tab)}>
              {tab === "All" ? "All tasks " + totalCount : tab}
            </button>
          )
        )
      }
    </div>

    {/* Search, priority filter and reset */}
    <div className="toolbar__right">
      {children}

      <label htmlFor="priorityFilter" className="visually-hidden">Filter by priority</label>
      <select id="priorityFilter" className="select" value={priorityFilter} onChange={(event) => onPriorityChange(event.target.value)}>
        <option value="All">Priority: All</option>
        <option value="Low">Priority: Low</option>
        <option value="Medium">Priority: Medium</option>
        <option value="High">Priority: High</option>
      </select>

      <button type="button" className="btn btn--outline" onClick={onReset}>Reset filters</button>
    </div>
  </div>

  return FilterTabsJsx
}

export default FilterTabs;