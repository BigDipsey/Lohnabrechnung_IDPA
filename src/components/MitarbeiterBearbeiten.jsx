import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './components.css'

function MitarbeiterBearbeiten() {
  const { mitarbeiterId } = useParams()
  const [mitarbeiterData, setMitarbeiterData] = useState({
    MitarbeiterName: '',
    Kinderanzahl: 0,
    BruttoLohn: 0,
    Geburtsdatum: '',
  })

  const navigate = useNavigate()

  const fetchMitarbeiterData = async () => {
    try {
      const response = await fetch(
        `https://idpa.azurewebsites.net/mitarbeiter/${mitarbeiterId}`
      )
      if (response.ok) {
        const data = await response.json()
        setMitarbeiterData(data)
      } else {
        console.error('Fehler beim Abrufen von Mitarbeiterdaten')
      }
    } catch (error) {
      console.error('Fehler beim Abrufen von Mitarbeiterdaten:', error)
    }
  }

  useEffect(() => {
    fetchMitarbeiterData()
  }, [mitarbeiterId])

  useEffect(() => {
    console.log('useEffect nach dem Fetch:', mitarbeiterData)
  }, [mitarbeiterData])

  const editiereMitarbeiter = async () => {
    try {
      const response = await fetch(
        `https://idpa.azurewebsites.net/mitarbeiter/${mitarbeiterId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mitarbeiterData),
        }
      )

      if (response.ok) {
        console.log('Mitarbeiter erfolgreich aktualisiert')
        fetchMitarbeiterData()
      } else {
        console.error('Fehler beim Aktualisieren des Mitarbeiters')
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Mitarbeiters:', error)
    }
    navigate('/')
  }
  return (
    <div>
      <h2>Mitarbeiter Bearbeiten</h2>
      <div className="mitarbeitername-balken">
        <label>Mitarbeitername:</label>
        <input
          className="input-group"
          type="text"
          value={mitarbeiterData.MitarbeiterName}
          onChange={(e) =>
            setMitarbeiterData({
              ...mitarbeiterData,
              MitarbeiterName: e.target.value,
            })
          }
          placeholder="Name"
        />
      </div>

      <div>
        <label>Geburtsdatum:</label>
        <input
          className="input-group"
          type="date"
          value={mitarbeiterData.Geburtsdatum}
          onChange={(e) =>
            setMitarbeiterData({
              ...mitarbeiterData,
              Geburtsdatum: e.target.value,
            })
          }
          placeholder="Geburtsdatum"
        />
      </div>

      <div>
        <label>Bruttolohn:</label>
        <input
          className="input-group"
          type="number"
          value={mitarbeiterData.BruttoLohn}
          onChange={(e) =>
            setMitarbeiterData({
              ...mitarbeiterData,
              BruttoLohn: e.target.value,
            })
          }
          placeholder="BruttoLohn"
        />
      </div>

      <div>
        <label>Kinderanzahl:</label>
        <input
          className="input-group"
          type="number"
          value={mitarbeiterData.Kinderanzahl}
          onChange={(e) =>
            setMitarbeiterData({
              ...mitarbeiterData,
              Kinderzahl: e.target.value,
            })
          }
          placeholder="Kinderzahl"
        />
      </div>

      <button onClick={editiereMitarbeiter}>Mitarbeiter aktualisieren</button>
    </div>
  )
}

export default MitarbeiterBearbeiten
