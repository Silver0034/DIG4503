// * import dependencies
import Express from 'express'
import fs from 'fs'

// * define the app and port
const App = Express()
const port = 3010

// get contents of database file
let fileContents = fs.readFileSync('database.json')
// parse database contents
let database = JSON.parse(fileContents)

// * response for /
App.get('/employees/:name', (req, res) => {
	// get name to search for from request
	const { name: search } = req.params

	// setup result equal to default error message
	let result = { error: 'not found' }

	// foreach entry in the database
	for (let employee of database) {
		// get name of employee of current loop
		const { name } = employee
		// if name matches search term
		if (name.toLowerCase() === search.toLocaleLowerCase()) {
			// set result to found employee
			result = employee
			// stop looping
			break
		}
	}

	// send response
	res.json(result)
})

App.get('/ages/:number', (req, res) => {
	// get name to search for from request
	const { number: search } = req.params

	// setup result equal to default error message
	let result = { error: 'not found' }

	// foreach entry in the database
	for (let employee of database) {
		// get name of employee of current loop
		const { age } = employee
		// if name matches search term
		if (age === parseInt(search)) {
			// set result to found employee
			result = employee
			// stop looping
			break
		}
	}

	// send response
	res.json(result)
})

// * start server
App.listen(port, () => {
	// log that the server is listening
	console.log(`The server is running on port ${port}`)
})
