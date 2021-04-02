import React from 'react'
class NameSearch extends React.Component {
	readName(e) {
		// prevent the form from submitting normally
		e.preventDefault()

		// get name element
		const element = document.querySelector('#name')

		// fetch name from api
		fetch('/employees/' + element.value)
			.then((res) => {
				// return response string to json
				return res.json()
			})
			.then((processed) => {
				console.log(processed)
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
				reporting.innerHTML = processed.age
			})
		element.value = ''
	}

	render() {
		return (
			<div>
				<h2>Name</h2>
				<form onSubmit={this.readName}>
					<input id='name' type='text' />
					<button>Submit</button>
				</form>
			</div>
		)
	}
}

export default NameSearch
