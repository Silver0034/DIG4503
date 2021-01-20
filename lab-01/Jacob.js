const Person = require('./Person.js')

class Jacob extends Person {
	constructor(props) {
		const { name = 'Jacob', favoriteColor = '#d12300' } = props

		super({ name, favoriteColor })
	}
	speak() {
		super.speak()
	}
}

module.exports = Jacob
