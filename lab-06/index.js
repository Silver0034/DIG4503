// define dependencies
const Express = require('express')
// setup express
const App = Express()
const port = 3001

// listen for requests at path "/"
App.get('/', function (request, response) {
	// on request, send response
	response.send('Hello World!')
})

// listen for requests at path "/public" and show /public/index.html
App.use('/public', Express.static('public'))

// start the server and listen for requests
App.listen(port, function () {
	// log the server start when turning on
	console.log('Server is running.')
})
