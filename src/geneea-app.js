import React from 'react'

import {EntitiesTable} from './entities-table.js'


/**
 * This is the root component of the signle-page application.
 */
export class GeneeaSimpleTextAnalysisApp extends React.Component {
  constructor (props) {
    super(props)

    this.callGeneeaAnalysisAPI = this.callGeneeaAnalysisAPI.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)

    this.state = {
      text: "Enter some text to analyze.",
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
