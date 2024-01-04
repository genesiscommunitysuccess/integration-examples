import { Link } from 'react-router-dom'
import './FormsPage.css'

const FormsPage = () => {
  return (
    <div className="forms-page">
      <h1>Forms Page</h1>

      <Link to="/admin">Admin</Link>
    </div>
  )
}

export default FormsPage
