function Header()
{
  const HeaderJsx =
  <header>
    <nav aria-label="Breadcrumb">
      <span>Workspace</span> / <span aria-current="page">Overview</span>
    </nav>
    <div aria-label="User profile">JD</div>
  </header>

  return HeaderJsx
}

export default Header;