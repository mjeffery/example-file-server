const Router = require('express').Router
const storage = require('./storage')
const delay = require('./delay')

let api = new Router()

api.use( delay() )

api.get('/api/files', (req, res) => {
	names = storage.files.map( file => file.name )
	res.json(names) 
})

api.post('/api/files', (req, res) => {
	let { name, contentType, content } = req.body
	
	if(!name) {
		res.status(400)
		return res.send({ message: "filename 'name' is required!" })
	}
	
	for(let file of storage.files) {
		if(file.name == name) {
			res.status(409)
			return res.send({ message: `The file '${name}' already exists!` })
		}
	}

	storage.files.push({ name, contentType: contentType || 'text/plain', content })

	res.sendStatus(200)
})

api.get('/:filename', (req, res) => {
	let { filename: name } = req.params

	for(let file of storage.files) {
		if(file.name == name) {
			res.append('Content-Type', file.contentType)
			return res.send(file.content)
		}
	}

	res.sendStatus(404)
})

api.delete('/api/files/:filename', (req, res) => {
	let { filename: name } = req.params
	let length = storage.files.length

	storage.files = storage.files.filter( file => file.name != name )

	res.sendStatus( storage.files.length < length ? 200 : 404)
})

module.exports = api
