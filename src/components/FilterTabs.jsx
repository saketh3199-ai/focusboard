const STATUS_TABS = ["All","To do","In progress","Completed"];

function FilterTabs({ statusFilter, onStatusChange, priorityFilter, onPriorityChange, onReset, totalCount })
{
  const FilterTabsJsx =
  <div>
    {/* Status tabs */}
    <div>
      {
        STATUS_TABS.map
        (
          (tab) =>
          (
            <button key={tab} type="button" aria-pressed={statusFilter === tab} style={{fontWeight: statusFilter === tab ? "bold" : "normal"}} onClick={() => onStatusChange(tab)}>
              {tab === "All" ? "All tasks " + totalCount : tab}
            </button>
          )
        )
      }
    </div>

    {/* Priority filter */}
    <div>
      <label htmlFor="priorityFilter">Priority</label>
      <select id="priorityFilter" value={priorityFilter} onChange={(event) => onPriorityChange(event.target.value)}>
        <option value="All">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>

    <button type="button" onClick={onReset}>Reset filters</button>
  </div>

  return FilterTabsJsx
}

export default FilterTabs;