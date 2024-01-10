import { useState } from 'react';
import Lohnblatt from './Lohnblatt.jsx';
import { useNavigate } from 'react-router-dom';

function MitarbeiterHinzufuegen() {
  const [mitarbeiterName, setMitarbeiterName] = useState('');
  const [geburtsdatum, setGeburtsdatum] = useState('');
  const [bruttoLohn, setBruttoLohn] = useState(0);
  const [kinderanzahl, setKinderanzahl] = useState(0);
  const [fehlermeldung, setFehlermeldung] = useState('');

  const navigate = useNavigate();

  const sindAlleFelderAusgefuellt = () => {
    return mitarbeiterName && geburtsdatum && bruttoLohn > 0 && kinderanzahl >= 0;
  };

  

  const mitarbeiterZurDatenbankHinzufuegen = async () => {
    try {
      const neuerMitarbeiter = {
        MitarbeiterName: mitarbeiterName,
        Kinderanzahl: kinderanzahl,
        BruttoLohn: bruttoLohn,
        Geburtsdatum: geburtsdatum,
      };

      const antwort = await fetch(
        'https://idpa.azurewebsites.net/mitarbeiter',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(neuerMitarbeiter),
        }
      );

      if (antwort.ok) {
        console.log('Mitarbeiter erfolgreich hinzugefügt');
        navigate('/');
      } else {
        throw new Error('Fehler beim Hinzufügen des Mitarbeiters');
      }
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Mitarbeiters:', error);
      setFehlermeldung('Fehler beim Hinzufügen des Mitarbeiters. Bitte versuchen Sie es erneut.');
    }
  };

  return(
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
            required
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
            required
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
            min={0}
            required
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
            required
            min="0"
          />
        </div>

        <Lohnblatt bruttoLohn={bruttoLohn} kinderanzahl={kinderanzahl} />

        <button
          onClick={mitarbeiterZurDatenbankHinzufuegen}
          disabled={!sindAlleFelderAusgefuellt()}
        >
          Mitarbeiter hinzufügen
        </button>

        {fehlermeldung && <div className="error-message">{fehlermeldung}</div>}
      </div>
    </div>
  );
}

export default MitarbeiterHinzufuegen;
