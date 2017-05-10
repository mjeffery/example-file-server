const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mustache = require('mustache-express')

const PORT = process.env.PORT || 5000

let app = express()

app.engine('mustache', mustache() )
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use( cors() )
app.use( (req, res, next) => req.method == 'OPTIONS' ? res.sendStatus(200) : next() )

app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )

app.use( require('./routes') )
app.use( require('./api') )

app.listen(PORT, () => console.log(`example app is listening on port: ${PORT}`) )
