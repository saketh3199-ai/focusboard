import { useState } from "react";
import { LayoutGrid, ListChecks, Calendar, Settings } from "lucide-react";

const NAV_ITEMS =
[
  {label: "Overview",icon: LayoutGrid},
  {label: "My tasks",icon: ListChecks},
  {label: "Calendar",icon: Calendar},
  {label: "Settings",icon: Settings}
];

function Sidebar()
{
  const [activeItem, setActiveItem] = useState("Overview");

    const SidebarJsx =
  <aside className="sidebar">
    <div className="sidebar__brand">
      <span className="sidebar__logo"><LayoutGrid aria-hidden="true"/></span>
      <span className="sidebar__name">FocusBoard</span>
    </div>

    <nav className="sidebar__nav" aria-label="Main navigation">
      <p className="sidebar__label">WORKSPACE</p>
      {
        NAV_ITEMS.map
        (
          (item) =>
          {
            const Icon = item.icon;

            return (
              <button key={item.label} type="button" className={activeItem === item.label ? "nav-item nav-item--active" : "nav-item"} aria-current={activeItem === item.label ? "page" : undefined} onClick={() => setActiveItem(item.label)}>
                <Icon aria-hidden="true"/>
                {item.label}
              </button>
            );
          }
        )
      }
    </nav>
  </aside>

  return SidebarJsx
}

export default Sidebar;