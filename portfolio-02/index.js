// * import node packages
import MongoClient from 'mongodb'
import prompt from 'prompt'
import chalk from 'chalk'
import cTable from 'console.table'

// define url to use connect to database with
const URL =
	'mongodb+srv://jlodes:ySvXzsgIDhpYb5v7@cluster0.oewwc.mongodb.net/test?authSource=admin&replicaSet=atlas-2er35q-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

// define the program name when prompting the user
prompt.message = chalk.green('AirBnB Searcher')

// define prompt questions
const schema = {
	properties: {
		beds: {
			message: 'Please enter minimum number of beds integer',
			required: true
		},
		price: {
			message: 'Please enter maximum price integer',
			required: true
		},
		score: {
			message: 'Please enter minimum score rating integer',
			required: true
		}
	}
}

// connect to database
MongoClient.connect(URL, { useUnifiedTopology: true })
	// once connected
	.then((connection) => {
		// prompt user for search parameters
		prompt.get(schema, (err, promptResult) => {
			if (err) return console.log('error: ' + err)
			// get database
			let database = connection.db('sample_airbnb')

			// get all listings and reviews
			let collection = database.collection('listingsAndReviews')

			// filter the results
			let cursor = collection.find({
				'review_scores.review_scores_rating': {
					$gte: parseInt(promptResult.score)
				},
				beds: { $gte: parseInt(promptResult.beds) },
				price: { $lte: parseInt(promptResult.price) }
			})

			//object to generate table off of
			const cTableValues = []

			// add results to object for printing
			cursor.forEach(
				// the found listing
				(document) => {
					// add info to cTableValues for later printing
					cTableValues.push({
						name: chalk.blue(`${document.name}`),
						beds: chalk.blue(document.beds),
						price: `\$${chalk.blue(document.price)}`,
						scores: chalk.blue(
							document.review_scores.review_scores_rating
						)
					})
				},
				() => {
					// print results
					if (cTableValues.length) {
						console.log(
							cTable.getTable(
								chalk.green.bold('AirBnB Results'),
								cTableValues
							)
						)
					} else {
						// no results
						console.log('No results found matching search criteria')
					}
					// close the connection
					connection.close()
				}
			)
		})
	})
	// catch all errors
	.catch((error) => {
		// log the error
		console.log('Error: ' + error)
	})
