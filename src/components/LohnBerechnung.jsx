import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Lohnblatt from './Lohnblatt.jsx'

function LohnBerechnung() {
  const { mitarbeiterId } = useParams()
  const [bruttoLohn, setBruttoLohn] = useState(0)
  const [kinderanzahl, setKinderanzahl] = useState(0)
  const [geburtsdatum, setGeburtsdatum] = useState('')
  const [mitarbeiterName, setMitarbeiterName] = useState('')

  const fetchMitarbeiterData = async () => {
    try {
      const response = await fetch(
        `https://idpa.azurewebsites.net/mitarbeiter/${mitarbeiterId}`
      )
      if (response.ok) {
        const data = await response.json()
        setBruttoLohn(data.BruttoLohn)
        setKinderanzahl(data.Kinderanzahl)
        setGeburtsdatum(data.Geburtsdatum)
        setMitarbeiterName(data.MitarbeiterName)
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

  return (
    <div>
      <h2>Name: {mitarbeiterName}</h2>
      <p>Geburtsdatum: {geburtsdatum}</p>
      <Lohnblatt
        bruttoLohn={bruttoLohn}
        kinderanzahl={kinderanzahl}
      />
    </div>
  )
}

export default LohnBerechnung
