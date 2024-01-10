import { useState, useEffect } from 'react'
import Lohnblatt from './Lohnblatt'
import './components.css'

function Lohnvergleich() {
  const [mitarbeiterList, setMitarbeiterList] = useState([])
  const [selectedMitarbeiter1, setSelectedMitarbeiter1] = useState(null)
  const [selectedMitarbeiter2, setSelectedMitarbeiter2] = useState(null)

  const fetchMitarbeiterList = async () => {
    try {
      const response = await fetch('https://idpa.azurewebsites.net/mitarbeiter')
      if (response.ok) {
        const data = await response.json()
        setMitarbeiterList(data)
      } else {
        console.error('Fehler beim Abrufen der Mitarbeiterliste')
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Mitarbeiterliste:', error)
    }
  }

  const handleDropdownChange1 = (e) => {
    const selectedId = e.target.value
    const selectedMitarbeiter = mitarbeiterList.find(
      (mitarbeiter) => mitarbeiter._id === selectedId
    )
    setSelectedMitarbeiter1(selectedMitarbeiter)
  }

  const handleDropdownChange2 = (e) => {
    const selectedId = e.target.value
    const selectedMitarbeiter = mitarbeiterList.find(
      (mitarbeiter) => mitarbeiter._id === selectedId
    )
    setSelectedMitarbeiter2(selectedMitarbeiter)
  }

  useEffect(() => {
    fetchMitarbeiterList()
  }, [])

  return (
    <div className="container-lohnabrechnung-vergleichen">
      <div className="dropdown-container">
        <select className="dropdown" onChange={handleDropdownChange1}>
          <option value="">Mitarbeiter auswählen</option>
          {mitarbeiterList.map((mitarbeiter) => (
            <option key={mitarbeiter._id} value={mitarbeiter._id}>
              {mitarbeiter.MitarbeiterName}
            </option>
          ))}
        </select>

        {selectedMitarbeiter1 && (
          <div className="tabelle-container">
            <h1>{selectedMitarbeiter1.MitarbeiterName}</h1>
            <Lohnblatt
              bruttoLohn={selectedMitarbeiter1.BruttoLohn}
              kinderanzahl={selectedMitarbeiter1.Kinderanzahl}
            />
          </div>
        )}
      </div>

      <div className="dropdown-container">
        <select className="dropdown" onChange={handleDropdownChange2}>
          <option value="">Mitarbeiter auswählen</option>
          {mitarbeiterList.map((mitarbeiter) => (
            <option key={mitarbeiter._id} value={mitarbeiter._id}>
              {mitarbeiter.MitarbeiterName}
            </option>
          ))}
        </select>

        {selectedMitarbeiter2 && (
          <div className="tabelle-container">
            <h1>{selectedMitarbeiter2.MitarbeiterName}</h1>
            <Lohnblatt
              bruttoLohn={selectedMitarbeiter2.BruttoLohn}
              kinderanzahl={selectedMitarbeiter2.Kinderanzahl}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Lohnvergleich
