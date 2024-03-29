import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../../helpers/api";
import { AuthContext } from "../../GlobalContext/AuthContext/authContext";

function Edit() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const { accessToken, currentUser } = useContext(AuthContext) || {};
	const navigate = useNavigate();

	const { id } = useParams();

	const fetchSingleBlogPost = async () => {
		if (!currentUser) {
			return navigate("/login");
		}
		const response = await axios.get(`${BASE_URL}/blogPosts/${id}`);

		setTitle(response.data.data.title);
		setBody(response.data.data.body);
	};

	useEffect(() => {
		fetchSingleBlogPost();
	}, []);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const data = {
			title: title,
			body: body,
		};
		axios.put(`${BASE_URL}/blogPosts/${id}`, data, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold text-center mb-6">Edit Post</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label htmlFor="title" className="block text-sm font-medium text-gray-700">
							Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							required
						/>
					</div>
					<div>
						<label htmlFor="body" className="block text-sm font-medium text-gray-700">
							Body
						</label>
						<textarea
							id="body"
							name="body"
							value={body}
							onChange={(e) => setBody(e.target.value)}
							rows={4}
							className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							required
						></textarea>
					</div>
					<div className="flex justify-center">
						<button
							type="submit"
							className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white rounded-md"
						>
							Update Post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Edit;
