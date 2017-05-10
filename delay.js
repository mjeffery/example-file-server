const storage = require('./storage')

module.exports = function() {
	return (req, res, next) => {
		let { min, max } = storage.settings.apiDelay
		let delay = Math.floor( Math.random() * (max - min) ) + min

		setTimeout(next, delay)
	}
}
