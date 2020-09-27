/**
 * The backend for the application.
 *
 * Runs the web server and serves as middleware
 * for calls to the Geneea API.
 */

const path = require('path')
const https = require('https')

const express = require('express')

const app = express()
const port = process.env.PORT || 5000
const accessKey = 'user_key ba0d8598e8acaa705ea7d1fd42fd6554'

app.use(express.static('dist'))
app.use(express.json())

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.post('/geneea_middleware', (req, res) => {
  // Request body.
  const data = {
    id: 1,
    text: req.body.text,
    analyses: ['entities']
  }

  // Request meta-information.
  const options = {
    hostname: 'api.geneea.com',
    path: '/v3/analysis',
    port: 443,
    method: 'POST',
    headers: {
      Authorization: accessKey,
      'Content-Type': 'application/json'
    }
  }

  // Make a request to the Geneea API.
  const APIRequest = https.request(options, APIResponse => {
    APIResponse.on('data', d => {
      res.send(d)
    })
    APIResponse.on('error', err => {
      console.error(err)
    })
  })

  APIRequest.on('error', error => {
    console.error(error)
  })

  APIRequest.write(JSON.stringify(data))
  APIRequest.end()
})

app.listen(port, () => { console.log('App running.') })
