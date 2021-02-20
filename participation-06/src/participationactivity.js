import React, { useState, useEffect } from 'react'

const Counter = () => {
	const [count, setCount] = useState(0)

// componentDidMount
// only runs once at start
useEffect(() => {
    console.log('The effect ran')
}, [])

// componentDidUpdate
// runs after every time count is updated
useEffect(() => {
    console.log('The use effect ran')
}, [count])

// componentWillUnmount
// will run after every time something is removed
useEffect(() => {
    console.log('the use effect ran')
    return () => {
        console.log('The return has run')
    }
}, [])
}
