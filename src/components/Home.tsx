import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/api";
import Spinner from "../helpers/spinner"; // Make sure Spinner is styled or consider a Tailwind spinner
import { BlogPostType } from "../types/types";
import { AuthContext } from "../GlobalContext/AuthContext/authContext";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../helpers/pagination";

function Home() {
	const [blogLists, setBlogLists] = useState<BlogPostType[]>([]);
	const [comment, setComment] = useState("");
	const [paginationInfo, setPaginationInfo] = useState({
		currentPage: 1,
		totalPages: 1,
	});
	const { currentUser, accessToken } = useContext(AuthContext) || {};
	const navigate = useNavigate();

	const fetchData = async (page = 1) => {
		try {
			const response = await axios.get(`${BASE_URL}/blogPosts?page=${page}`);
			setBlogLists(response.data.data.data);
			setPaginationInfo({
				currentPage: response.data.data.current_page,
				totalPages: response.data.data.last_page,
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDeletePost = async (blogPost_id: any) => {
		if (!currentUser) {
			return navigate("/login");
		}
		try {
			await axios.delete(`${BASE_URL}/blogPosts/${blogPost_id}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			fetchData();
		} catch (error: any) {
			console.log(error);
			if (error.request.status === 403) {
				return toast.warning("Forbidden to remove post!");
			}
			toast.warning("Something went wrong!");
		}
	};

	const handleRemoveComment = async (blog_id: number, comment_id: number) => {
		if (!currentUser) {
			return navigate("/login");
		}
		try {
			await axios.delete(`${BASE_URL}/blogPosts/${blog_id}/comments/${comment_id}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			toast.success("Comment removed successfully!");
			fetchData();
		} catch (error: any) {
			console.log(error);
			if (error.request.status === 403) {
				toast.warning("Forbidden to remove comment!");
			}
		}
	};

	const handleAddComment = async (blogPost_id: number) => {
		if (!currentUser) {
			return navigate("/login");
		}

		const data = { body: comment };

		try {
			await axios.post(`${BASE_URL}/blogPosts/${blogPost_id}/comments`, data, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			toast.success("Comment added successfully!");
			fetchData();
			setComment("");
		} catch (error) {
			console.log(error);
			toast.warn("Something went wrong!");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center py-4">
				<h1 className="text-3xl font-bold">Home</h1>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{blogLists.length > 0 ? (
					blogLists.map((blogPost) => (
						<div className="col-span-1" key={blogPost.id}>
							<div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
								<div className="p-5">
									<div>
										<p className="text-gray-500 text-[13px]">author: {blogPost.user.name}</p>
										<p className="text-gray-500 text-[10px]">{blogPost.publish_date}</p>
									</div>
									<h2 className="text-xl font-semibold mb-2">{blogPost.title}</h2>
									<p>{blogPost.body}</p>
									<div className="mt-4">
										<p className="text-md mb-2 mt-3 text-gray-600">Comments</p>
										{blogPost.comments.length > 0 ? (
											blogPost.comments.map((comment) => (
												<div className="flex justify-between mb-2" key={comment.id}>
													<div>
														<p key={comment.id} className="text-gray-600">
															{comment.body}
														</p>
														<p className="text-gray-500 text-[11px]">author: {comment.user.name}</p>
													</div>
													<div className="flex gap-2">
														<button
															className="bg-red-500 text-white px-2 rounded-md"
															onClick={() => handleRemoveComment(blogPost.id, comment.id)}
														>
															remove
														</button>
														<Link
															className="bg-blue-500 text-white px-2 rounded-md text-center"
															to={`/edit/${blogPost.id}/comments/${comment.id}`}
														>
															edit
														</Link>
													</div>
												</div>
											))
										) : (
											<p className="text-gray-500">No comments yet.</p>
										)}
									</div>
								</div>
								<div className="p-5 border-t border-gray-200">
									<input
										type="text"
										name="comment"
										id={`comment${blogPost.id}`}
										placeholder="Add a comment…"
										className="input border border-gray-300 p-2 rounded-md w-full mb-2"
										onChange={(e) => setComment(e.target.value)}
									/>
									<button className="bg-green-500 text-white p-2 rounded-md w-full" onClick={() => handleAddComment(blogPost.id)}>
										Comment
									</button>
									<div className="mt-5 flex gap-3">
										<Link className="bg-blue-500 text-white p-2 rounded-md w-full text-center" to={`/edit/${blogPost.id}`}>
											Edit
										</Link>
										<button
											className="bg-red-500 text-white p-2 rounded-md w-full text-center"
											onClick={() => handleDeletePost(blogPost.id)}
										>
											delete
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				) : blogLists.length === 0 ? (
					<p>no posts yet...</p>
				) : (
					<Spinner />
				)}
			</div>
			<div className="mt-7">
				<Pagination
					currentPage={paginationInfo.currentPage}
					totalPages={paginationInfo.totalPages}
					onPageChange={(page: any) => fetchData(page)}
				/>
			</div>
		</div>
	);
}

export default Home;
