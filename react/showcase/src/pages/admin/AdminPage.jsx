import { Link } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <nav>
        <Link to="/admin">Admin</Link>
        <Link to="/analitics">Analitics</Link>
      </nav>
    </div>
  )
}

export default AdminPage
