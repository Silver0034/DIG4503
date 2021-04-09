// * import node packages
import MongoClient from 'mongodb'

// define url to use connect to database with
const URL =
	'mongodb+srv://jlodes:ySvXzsgIDhpYb5v7@cluster0.oewwc.mongodb.net/test?authSource=admin&replicaSet=atlas-2er35q-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

// connect to database
MongoClient.connect(URL, { useUnifiedTopology: true })
	// once connected
	.then((connection) => {
		// get database
		let database = connection.db('sample_airbnb')

		// get all listings and reviews
		let collection = database.collection('listingsAndReviews')

		// filter the results
		let cursor = collection.find({
			'review_scores.review_scores_rating': { $gte: 99 },
			beds: { $gte: 5 },
			price: { $lte: 200 }
		})

		// print each of the filtered results
		cursor.forEach(
			(document) => {
				// print the results
				console.log(`${document.name}:`)
				console.log(`${document.beds} beds,`)
				console.log(`\$${document.price},`)
				console.log(
					`Review Scores Rating: ${document.review_scores.review_scores_rating}`
				)
				console.log(`----`)
			},
			() => {
				// close the connection
				connection.close()
			}
		)
	})
	// catch all errors
	.catch((error) => {
		// log the error
		console.log('Error: ' + error)
	})
