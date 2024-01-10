/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'

const GehaltsTabelle = React.forwardRef(
  (
    {
      
      bruttoLohn,
      kinderzulage,
      gesamteAbzuege,
      ahvIvEo,
      alv,
      pensionskasse,
      nbu,
      nettoLohn,
    },
    ref
  ) => {
    return (
      <table className="gehalts-tabelle" ref={ref}>
        
        <thead>
          <tr>
            <th>Bezeichnung</th>
            <th>Basis</th>
            <th>Prozent</th>
            <th>Betrag</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bruttolohn</td>
            <td>{bruttoLohn}</td>
            <td>-</td>
            <td>{bruttoLohn}</td>
          </tr>
          <tr>
            <td>AHV/IV/EO</td>
            <td>{bruttoLohn}</td>
            <td>5.275%</td>
            <td>{ahvIvEo.toFixed(2)}</td>
          </tr>
          <tr>
            <td>ALV</td>
            <td>{bruttoLohn}</td>
            <td>1.1%</td>
            <td>{alv.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Pensionskasse</td>
            <td>{bruttoLohn}</td>
            <td>12.0%</td>
            <td>{pensionskasse.toFixed(2)}</td>
          </tr>
          <tr>
            <td>NBU</td>
            <td>{bruttoLohn}</td>
            <td>1.0%</td>
            <td>{nbu.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Kinderzulage</td>
            <td>-</td>
            <td>-</td>
            <td>{kinderzulage}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Gesamte Arbeitnehmerbeiträge</td>
            <td>-</td>
            <td>-</td>
            <td>{gesamteAbzuege.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Nettolohn</td>
            <td>-</td>
            <td>-</td>
            <td>{nettoLohn.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    )
  }
)

export default GehaltsTabelle
