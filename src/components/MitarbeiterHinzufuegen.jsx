import { useState } from 'react'
import Lohnblatt from './Lohnblatt'
import { useNavigate } from 'react-router-dom'

function MitarbeiterHinzufuegen() {
  const [mitarbeiterName, setMitarbeiterName] = useState('')
  const [geburtsdatum, setGeburtsdatum] = useState('')
  const [bruttoLohn, setBruttoLohn] = useState(0)
  const [kinderanzahl, setKinderanzahl] = useState(0)

  const navigate = useNavigate()

  const mitarbeiterZurDatenbankHinzufuegen = async () => {
    try {
      const neuerMitarbeiter = {
        MitarbeiterName: mitarbeiterName,
        Kinderanzahl: kinderanzahl,
        BruttoLohn: bruttoLohn,
        Geburtsdatum: geburtsdatum,
      }

      const antwort = await fetch(
        'https://idpa.azurewebsites.net/mitarbeiter',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(neuerMitarbeiter),
        }
      )

      if (antwort.ok) {
        console.log('Mitarbeiter erfolgreich hinzugefügt')
      } else {
        console.error('Fehler beim Hinzufügen des Mitarbeiters')
      }
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Mitarbeiters:', error)
    }
    navigate('/')
  }

  return (
    <div className="app-container">
      <div className="gehalt-calculator-container">
        <div className="input-group">
          <label>Mitarbeitername:</label>
          <input
            id="mitarbeiterName"
            type="text"
            value={mitarbeiterName}
            onChange={(e) => setMitarbeiterName(e.target.value)}
            placeholder="Name"
          />
        </div>

        <div className="input-group">
          <label>Geburtsdatum:</label>
          <input
            id="geburtsdatum"
            type="date"
            value={geburtsdatum}
            onChange={(e) => setGeburtsdatum(e.target.value)}
            placeholder="Geburtsdatum"
          />
        </div>

        <div className="input-group">
          <label>Bruttolohn:</label>
          <input
            id="bruttoLohn"
            type="number"
            value={bruttoLohn}
            onChange={(e) => setBruttoLohn(e.target.value)}
            placeholder="Bruttolohn"
          />
        </div>

        <div className="input-group">
          <label>Kinderanzahl:</label>
          <input
            id="kinderanzahl"
            type="number"
            value={kinderanzahl}
            onChange={(e) => setKinderanzahl(e.target.value)}
            placeholder="Kinderanzahl"
          />
        </div>

        <Lohnblatt bruttoLohn={bruttoLohn} kinderanzahl={kinderanzahl} />

        <button onClick={mitarbeiterZurDatenbankHinzufuegen}>
          Mitarbeiter hinzufügen
        </button>
      </div>
    </div>
  )
}

export default MitarbeiterHinzufuegen
