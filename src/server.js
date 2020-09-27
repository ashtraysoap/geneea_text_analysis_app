const path = require('path')
const https = require('https')

const express = require('express')

const app = express()
const port = process.env.PORT || 5000
const accessKey = 'user_key ba0d8598e8acaa705ea7d1fd42fd6554'

app.use(express.static('public/dist'))
app.use(express.json())

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'))
})

app.post('/geneea_middleware', (req, res) => {
  console.log(req.body)

  const data = {
    id: 1,
    text: req.body.text,
    analyses: ['entities']
  }

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

  const r = https.request(options, response => {
    console.log(`statusCode: ${response.statusCode}`)

    response.on('data', d => {
      process.stdout.write(d)
      res.send(d)
    })
  })

  r.on('error', error => {
    console.error(error)
  })

  r.write(JSON.stringify(data))
  r.end()
})

app.listen(port, () => { console.log('App running.') })
