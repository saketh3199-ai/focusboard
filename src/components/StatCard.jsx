// A reusable card. It only displays what it receives through props.
function StatCard({ title, value, note, icon, tone })
{
  // A component stored in a variable must start with a capital letter to be used as a tag.
  const Icon = icon;

  const StatCardJsx =
  <article className={"stat-card stat-card--" + tone}>
    <div className="stat-card__header">
      <span className="stat-card__icon"><Icon aria-hidden="true"/></span>
      <p className="stat-card__title">{title}</p>
    </div>
    <div className="stat-card__body">
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__note">{note}</p>
    </div>
  </article>

  return StatCardJsx
}

export default StatCard;