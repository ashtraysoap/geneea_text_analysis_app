import React from 'react'
import ReactDOM from 'react-dom'

class GeneeaSimpleTextAnalysisApp extends React.Component {
  constructor (props) {
    super(props)

    this.callGeneeaAnalysisAPI = this.callGeneeaAnalysisAPI.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)

    this.state = {
      text: "J'ai oublie mon cahier.",
      entities: null
    }
  }

  callGeneeaAnalysisAPI () {
    const url = 'geneea_middleware'
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: this.state.text })
    }

    // Call the middleware, retrieving the results of
    // the Geneea text analysis.
    fetch(url, init)
      .then(response => response.json())
      .then(data => this.setState({ entities: data.entities }))
  }

  handleInputChange (string) {
    this.setState({ text: string })
  }

  render () {
    return (
      <div>
        <TextInput text={this.state.text} onChange={this.handleInputChange} />
        <SubmitButton handleClick={this.callGeneeaAnalysisAPI} />
        <EntitiesTable entities={this.state.entities} />
      </div>
    )
  }
}

function TextInput (props) {
  return (
    <textarea rows='20' cols='80' onChange={(e) => props.onChange(e.target.value)} value={props.text} />
  )
}

function SubmitButton (props) {
  return <button onClick={props.handleClick}>Submit</button>
}

function EntitiesTable (props) {
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

ReactDOM.render(
  <GeneeaSimpleTextAnalysisApp />,
  document.getElementById('root')
)
