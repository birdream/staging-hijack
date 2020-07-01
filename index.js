const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

const validate = require('./src/validate')
const hijack = require('./src/hijack')

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('ok..'))
app.get('/favicon.ico', (req, res) => res.send('ok...'))

app.get('/webhook', validate)
app.post('/webhook', hijack)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))