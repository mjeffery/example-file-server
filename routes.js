const Router = require('express').Router
const storage = require('./storage')

const parseNumber = value => {
	let num = parseInt(value)
	return isNaN(num) ? 0 : num
}

let routes = new Router()

routes.get('/', (req, res) => res.render('index', storage) )

routes.post('/settings', (req, res) => {
	let { 'apiDelay.min': min, 'apiDelay.max': max } = req.body
	
	min = parseNumber(min)
	max = parseNumber(max)

	if(min > max) max = min

	storage.settings.apiDelay = { min, max }

	res.redirect('/')
})


module.exports = routes
