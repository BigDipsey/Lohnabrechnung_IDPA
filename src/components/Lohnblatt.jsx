import { useRef, useState } from 'react'
import './components.css'
import GehaltsTabelle from './Gehaltstabelle.jsx'
import { useReactToPrint } from 'react-to-print'

function Lohnblatt({ bruttoLohn, kinderanzahl, mitarbeitername }) {
  const [zeigBuchungsaetze, setZeigBuchungsaetze] = useState(false)
  const ref = useRef()
  const ahvIvEo = bruttoLohn * 0.05275
  const alv = bruttoLohn * 0.011
  const pensionskasse = bruttoLohn * 0.12
  const nbu = bruttoLohn * 0.01
  const kinderzulage = kinderanzahl * 200
  const gesamteAbzuege = ahvIvEo + alv + pensionskasse + nbu
  const nettoLohn = bruttoLohn - gesamteAbzuege + kinderzulage

  const zeigeBuchungsaetze = () => {
    setZeigBuchungsaetze(true)
  }

  const drucken = useReactToPrint({
    content: () => ref.current,
  })

 return (
    <div className="gehalts-tabelle-container">
      <h3>Gehaltsaufschlüsselung</h3>
      <GehaltsTabelle
        bruttoLohn={bruttoLohn}
        kinderzulage={kinderzulage}
        gesamteAbzuege={gesamteAbzuege}
        ahvIvEo={ahvIvEo}
        alv={alv}
        pensionskasse={pensionskasse}
        nbu={nbu}
        nettoLohn={nettoLohn}
        mitarbeitername={mitarbeitername}
        ref={ref}
        
      />
      <button onClick={zeigeBuchungsaetze}>Buchungsätze Anzeigen</button>
      <button onClick={drucken}>Drucken</button>
      {zeigBuchungsaetze && (
        <div>
          <b>Arbeitgeber;</b>
          <div>
            Sozial Versicherungs Aufwand - Verbindlichkeit Sozialversicherung {ahvIvEo}
          </div>
          <div>
            Sozial Versicherungs Aufwand - Verbindlichkeit Sozialversicherung {alv}
          </div>
          <div>
            Sozial Versicherungs Aufwand - Verbindlichkeit Sozialversicherung {pensionskasse}
          </div>
          <div>
            Sozial Versicherungs Aufwand - Verbindlichkeit Sozialversicherung {alv}
          </div>
          <div>
            Sozial Versicherungs Aufwand - Verbindlichkeit Sozialversicherung {nbu}
          </div>
          <div>
            Sozial Versicherungs Aufwand - Verbindlichkeit Sozialversicherung {kinderzulage}
          </div>
          <div>
            Lohnaufwand - Verbindlichkeit Sozialversicherung {ahvIvEo}
          </div>
          <div>
          Lohnaufwand - Verbindlichkeit Sozialversicherung {alv}
          </div>
          <div>
          Lohnaufwand - Verbindlichkeit Sozialversicherung {pensionskasse}
          </div>
          <div>
          Lohnaufwand - Verbindlichkeit Sozialversicherung {alv}
          </div>
          <div>
          Lohnaufwand - Verbindlichkeit Sozialversicherung {nbu}
          </div>
          <div>
          Lohnaufwand -  Bank {nettoLohn}
          </div>
        </div>
      )}
    </div>
  )
}

export default Lohnblatt
