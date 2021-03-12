// * import dependencies
import Express, { request } from 'express'

// * define the app and port
const App = Express()
const port = 45030

// * define names
const names = [
	'Cortney',
	'Dewayne',
	'Trenton',
	'Pamala',
	'Ettie',
	'Errol',
	'Lorrie',
	'Hang',
	'Lauryn',
	'Caterina',
	'Isa',
	'Marcela'
]

// * response for /people/{name}
App.get('/people/:person', (req, res) => {
	// search array for matches
	const name = names.find(
		(name) =>
			name.toLocaleLowerCase() === req.params.person.toLocaleLowerCase()
	)
	// respond with the name or "not found"
	res.json({
		name: name || 'not found'
	})
})

// * response for searching for names
App.get('/search/:name', (req, res) => {
	// filter options
	const result = names.filter((str) => {
		// any string that includes the searched for paramter
		return str.includes(req.params.name)
	})
	// send the response
	if (result.length > 0) {
		// respond with result if found
		res.json(result)
	} else {
		// respond with error if not found
		res.json({
			search: 'not found'
		})
	}
})

// * start server
App.listen(port, () => {
	// log that the server is listening
	console.log(`The server is running on port ${port}`)
})
