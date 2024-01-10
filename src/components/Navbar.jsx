import { Link } from 'react-router-dom'
import '../App.css'

function Navbar() {
  return (
    <>
      <div className="navigationsleiste">
        <Link to="/" className="Logo">
          {' '}
          Lohnabrechner
        </Link>
        <div className="links">
          <Link className='linkStyle' to="/mitarbeiterhinzufügen"> Mitarbeiterhinzufügen</Link>
          <Link className='linkStyle' to="/lohnabrechnungvergleich">lohnabrechnungvergleich</Link>
          <Link className='linkStyle' to="/">Mitarbeiterliste</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
