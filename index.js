const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

const validate = require('./src/validate')
const hijack = require('./src/hijack')
const live = require('./src/instagram');

const router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(`${__dirname}/src/pages/index.html`)
})

app.use('/web', router)
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('ok..'))
app.get('/favicon.ico', (req, res) => res.send('ok...'))

app.get('/webhook', validate)
app.post('/webhook', hijack)

app.post('/ig/login', live.login)
app.get('/ig/live/prepare', live.prepareLive)
app.get('/ig/live/start', live.startLive)
app.get('/ig/live/end', live.endLive)
app.get('/ig/live/common', live.getCommon)
app.post('/ig/live/common', live.postCommon)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))