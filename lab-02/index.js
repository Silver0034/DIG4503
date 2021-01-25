// dependencies
const axios = require('axios')

// fetch the url
axios('https://pokeapi.co/api/v2/pokemon/growlithe')
	// then after getting a response response
	.then((response) => {
		// save the data to variables
		const { name, id } = response.data

		// log the name and id of the requested pokemon
		console.log(`This is a ${name} and its ID is ${id}`)
	})
	// catch any errors
	.catch((err) => {
		// log error to console
		console.log(`Error: ${err}`)
	})
