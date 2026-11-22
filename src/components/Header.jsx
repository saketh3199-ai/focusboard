function Header()
{
  const HeaderJsx =
  <header className="header">
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