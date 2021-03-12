// import dependencies
import Express, { request } from 'express'

// define the app and port
const App = Express()
const port = 3010

// * get /users page
App.get('/users', (req, res) => {
	// send a message prompting visitor to try the dynamic route
	res.send('Please visit /users/{id} or /users/{id}/{name}')
})
// users dynamic route
App.get('/users/:id/:name?', (req, res) => {
	// send response json based on user input
	res.json({
		userID: req.params.id,
		// default name to not defined if not included in route
		userFName: req.params.name || 'not defined'
	})
})

// * get /colors page
App.get('/colors/', (req, res) => {
	// send a message prompting visitor to try the dynamic route
	res.send('Please visit /colors/{color}')
})
// colors dynamic route
App.get('/colors/:color', (req, res) => {
	res.send(
		`You chose the color <span style="color: ${req.params.color};">${req.params.color}</span>`
	)
})

// * start server
App.listen(port, () => {
	// log that the server is listening
	console.log(`The server is running on port ${port}`)
})
