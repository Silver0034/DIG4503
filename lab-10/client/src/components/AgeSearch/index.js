import React from 'react'

class AgeSearch extends React.Component {
	readAge(e) {
		// prevent the form from submitting normally
		e.preventDefault()

		// get age element
		const element = document.querySelector('#age')

		// fetch age from api
		fetch('/ages/' + element.value)
			.then((res) => {
				// return response string to json
				return res.json()
			})
			.then((processed) => {
				// get reporting object
				const reporting = document.querySelector('#reportingArea')

				// set reporting to error if there was an error
				if (processed.error) {
					// set error
					reporting.innerHTML = processed.error
					// stop running
					return
				}
				// set reporting to name
				reporting.innerHTML = processed.name
			})
		element.value = ''
	}

	render() {
		return (
			<div>
				<h2>Age</h2>
				<form onSubmit={this.readAge}>
					<input id='age' type='text' />
					<button>Submit</button>
				</form>
			</div>
		)
	}
}

export default AgeSearch
