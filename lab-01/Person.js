class Person {
	constructor(props) {
		const { name, favoriteColor } = props
		this.name = name
		this.favoriteColor = favoriteColor
	}
	speak() {
		console.log(
			`Hello, my name is ${this.name} and my favorite color is ${this.favoriteColor}`
		)
	}
}

module.exports = Person
