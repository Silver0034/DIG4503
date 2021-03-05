// * dependencies
// enables call to api
const axios = require('axios')
// for handling user prompts in console
const prompt = require('prompt')
// for adding colors to console
const chalk = require('chalk')

// format prompt
prompt.message = chalk.green('An ID is needed!')

// ask for prompt
prompt.start()

// define what the prompt asks of the user
const schema = {
	properties: {
		id: {
			message: chalk.red('Please enter a valid Pokemon ID'),
			required: true
		}
	}
}

// function to ask for input and print pokemon to console
function getPokemonInfo(schema) {
	// ask for input
	prompt.get(schema, (err, result) => {
		// stop execution and run error handler if necessary
		if (err) return handleError(err)

		// fetch the url based on input
		axios(`https://pokeapi.co/api/v2/pokemon/${result.id}`)
			// then after getting a response response
			.then((response) => {
				// save the data to variables
				const { name, id } = response.data
				// log the name and id of the requested pokemon
				console.log(
					`Name: ${chalk.blue(name)}, It's ID: ${chalk.blue(id)}`
				)

				// prompt the user again
				getPokemonInfo(schema)
			})
			// catch any errors
			.catch((err) => {
				// log error to console
				console.log(`Error: ${err}`)
			})
	})
}

// log to the console an intro for the project
console.log('This portfolio project extends lab-02.')
console.log('I have added the use of two modules, "prompt" and "chalk".')
console.log("Get a pokemon by typing it's ID! To end the project use ctr+c.")
// prompt the user for an input
getPokemonInfo(schema)

// error handler
function handleError(error) {
	// log error
	console.log(error)
	// return
	return 1
}
