import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MitarbeiterAdd from './components/MitarbeiterHinzufuegen.jsx'
import MitarbeiterListe from './components/MitarbeiterListe.jsx'
import LohnabrechnungVergleich from './components/LohnVergleich.jsx'
import LohnabrechnungBerechner from './components/LohnBerechnung.jsx'
import MitarbeiterBearbeiten from './components/MitarbeiterBearbeiten.jsx'
import Navbar from './components/Navbar.jsx'
import Error from './components/Error.jsx'

function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<MitarbeiterListe />} />
          <Route
            path="/lohnabrechnungvergleich"
            element={<LohnabrechnungVergleich />}
          />
          <Route
            path="/lohnabrechnungberechner/:mitarbeiterId"
            element={<LohnabrechnungBerechner />}
          />
          <Route path="/mitarbeiterhinzufügen" element={<MitarbeiterAdd />} />
          <Route
            path="/mitarbeiterbearbeiten/:mitarbeiterId"
            element={<MitarbeiterBearbeiten />}
          />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </>
  )
}

export default App
