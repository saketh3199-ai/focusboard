import { LayoutGrid } from "lucide-react";

// The top bar: breadcrumb on the left, avatar on the right.
// On mobile the sidebar becomes a bottom bar, so the brand moves up here.
function Header()
{
  const HeaderJsx =
  <header className="header">
    {/* Brand: only visible on mobile */}
    <div className="header__brand">
      <span className="sidebar__logo"><LayoutGrid aria-hidden="true"/></span>
      <span className="sidebar__name">FocusBoard</span>
    </div>

    <nav className="header__breadcrumb" aria-label="Breadcrumb">
      <span>Workspace</span>
      <span>/</span>
      <span className="header__current" aria-current="page">Overview</span>
    </nav>

    <div className="header__avatar" aria-label="User profile">JD</div>
  </header>

  return HeaderJsx
}

export default Header;