import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Posts = () => {
	const [posts, setPosts] = useState()

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
			const responsePosts = res.data
			setPosts(responsePosts)
		})
	}, [])

	return (
		<div>
			<h1>Posts List</h1>
			{posts &&
				posts.map((post) => {
					const { id, title } = post
					return (
						<div key={id}>
							<h5>{title}</h5>
							<p>Assigned to user: {id}</p>
						</div>
					)
				})}
		</div>
	)
}

export default Posts
