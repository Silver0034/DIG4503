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

// * response for finding employee by name
App.get('/employees/:name', (req, res) => {
	// get name to search for from request
	const { name: search } = req.params

	// setup result equal to default error message
	let result = { error: 'not found' }

	// foreach entry in the database
	database.forEach((employee) => {
		// get employee name
		const name = employee.name
		// compare name and search term
		if (name.toLowerCase() === search.toLowerCase()) {
			// set result to employee
			result = employee
		}
	})

	// send response
	res.json(result)
})

// * response for finding employee by age
App.get('/ages/:number', (req, res) => {
	// get name to search for from request
	const { number: search } = req.params

	// setup result equal to default error message
	let result = { error: 'not found' }

	// foreach entry in the database
	database.forEach((employee) => {
		// compare name and search term
		if (employee.age === parseInt(search)) {
			// set result to employee
			result = employee
		}
	})

	// send response
	res.json(result)
})

// * response to add new employee to database
App.post('/employees/:name/:age', (req, res) => {
	// get name to search for from request
	const { name: name, age: age } = req.params

	let result = {
		name: name,
		age: age
	}

	database.push(result)

	fs.writeFileSync('database.json', JSON.stringify(database, null, '\t'))

	res.json(result)
})

// serve html form on path "/"
App.use('/', Express.static('public'))

// * start server
App.listen(port, () => {
	// log that the server is listening
	console.log(`The server is running on port ${port}`)
})
