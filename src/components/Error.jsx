
import { Link } from 'react-router-dom'
import './components.css'

function Error() {
  return (
    <div className="fehler">
      <h1> 404 </h1>
      <h2>Seite nicht gefunden</h2>
      <Link to="/" className="knopf">
        Home Page
      </Link>
    </div>
  )
}

export default Error
