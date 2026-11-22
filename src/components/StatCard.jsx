// A small reusable card. It only displays what it receives through props.
function StatCard({ title, value, note })
{
  const StatCardJsx =
  <div>
    <p>{title}</p>
    <p>{value}</p>
    <p>{note}</p>
  </div>

  return StatCardJsx
}

export default StatCard;