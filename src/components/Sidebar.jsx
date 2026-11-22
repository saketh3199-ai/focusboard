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
  <aside>
    <div>
      <span>FocusBoard</span>
    </div>

    <nav aria-label="Main navigation">
      <p>WORKSPACE</p>
      {
        NAV_ITEMS.map
        (
          (item) =>
          {
            const Icon = item.icon;

            return (
              <button key={item.label} type="button" aria-current={activeItem === item.label ? "page" : undefined} onClick={() => setActiveItem(item.label)}>
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