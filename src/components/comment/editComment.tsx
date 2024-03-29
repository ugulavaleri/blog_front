import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../GlobalContext/AuthContext/authContext";
import { BASE_URL } from "../../helpers/api";

function EditComment() {
	const [comment, setComment] = useState("");
	const { accessToken, currentUser } = useContext(AuthContext) || {};
	const { blogPost_id, comment_id } = useParams();
	const navigate = useNavigate();

	const fetchSingleComment = async () => {
		if (!currentUser) {
			return navigate("/login");
		}
		const response = await axios.get(`${BASE_URL}/blogPosts/${blogPost_id}/comments/${comment_id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		setComment(response.data.message.body);
	};

	useEffect(() => {
		fetchSingleComment();
	}, []);

	const handleEditComment = async () => {
		if (!currentUser) {
			return navigate("/login");
		}
		const data = {
			body: comment,
		};
		await axios.put(`${BASE_URL}/blogPosts/${blogPost_id}/comments/${comment_id}`, data, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	};

	return (
		<div className="container mx-auto p-4">
			<div className="w-full max-w-xl p-6 mx-auto bg-white rounded-md shadow-md">
				<h2 className="text-lg font-semibold text-gray-700 capitalize">Edit Comment</h2>
				<form onSubmit={handleEditComment}>
					<div className="mt-4">
						<label htmlFor="comment" className="block">
							Comment
						</label>
						<textarea
							id="comment"
							className="mt-2 px-3 py-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
							placeholder="Edit your comment..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							required
						></textarea>
					</div>
					<div className="flex justify-end mt-6">
						<button
							type="submit"
							className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
							onClick={handleEditComment}
						>
							Update Comment
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditComment;
