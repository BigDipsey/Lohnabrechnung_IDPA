import { useState, useEffect } from 'react'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './components.css'


function MitarbeiterListe() {
  const [mitarbeiter, setMitarbeiter] = useState([])
  const mitarbeiterAbrufen = async () => {
    try {
      const antwort = await fetch('https://idpa.azurewebsites.net/mitarbeiter')

      if (antwort.ok) {
        const mitarbeiterDaten = await antwort.json()
        setMitarbeiter(mitarbeiterDaten)
      } else {
        console.error('Fehler beim Abrufen der Mitarbeiter')
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Mitarbeiter:', error)
    }
  }

  useEffect(() => {
    mitarbeiterAbrufen()
  }, [])

  const handleDeleteClick = async (mitarbeiterId) => {
    try {
      const response = await fetch(
        `https://idpa.azurewebsites.net/mitarbeiter/${mitarbeiterId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        mitarbeiterAbrufen()
        console.log(`Mitarbeiter mit ID ${mitarbeiterId} erfolgreich gelöscht`)
      } else {
        console.error('Fehler beim Löschen des Mitarbeiters')
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Mitarbeiters:', error)
    }
  }

  return (
    <>
      <div className="mitarbeiter-listen-container">
        <h2>Mitarbeiterliste</h2>
        <ul className="mitarbeiter-liste">
          {mitarbeiter.map((mitarbeiter) => (
            <li className='mitarbeiter-box' key={mitarbeiter._id}>
              <div><strong>Name:</strong> {mitarbeiter.MitarbeiterName}</div>
              <div><strong>Anzahl der Kinder:</strong> {mitarbeiter.Kinderanzahl}</div>
              <div><strong>Bruttogehalt:</strong> {mitarbeiter.BruttoLohn}</div>
              <div><strong>Geburtsdatum:</strong> {mitarbeiter.Geburtsdatum}</div>
              <div className="button-container">
                <Link to={`/mitarbeiterbearbeiten/${mitarbeiter._id}`}>
                  <FaEdit className="icon edit-icon" />
                </Link>
                <Link to={`/lohnabrechnungberechner/${mitarbeiter._id}`}>
                 Details 
                </Link>
                <MdDelete
                  onClick={() => handleDeleteClick(mitarbeiter._id)}
                  className="icon delete-icon"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MitarbeiterListe
