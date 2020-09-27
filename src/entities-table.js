import React from 'react'

/**
 * This component displays the entities returned from the Geneea API.
 */
export function EntitiesTable (props) {
    // Initial state - no results to show.
    if (props.entities === null) { return null }
  
    // No entities detected.
    if (props.entities.length === 0) { return <div>No entities detected.</div> }
  
    const entities = props.entities.map(e => {
      return (
        <tr key={e.id}>
          <td>{e.id}</td>
          <td>{e.stdForm}</td>
          <td>{e.type}</td>
        </tr>
      )
    })
  
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Standard form</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {entities}
        </tbody>
      </table>
    )
  }
