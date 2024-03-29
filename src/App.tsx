import { ErrorResponse, Route, Routes } from "react-router";
import Registration from "./components/auth/registration";
import Login from "./components/auth/login";
import Home from "./components/Home";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./helpers/api";
import { AuthContext } from "./GlobalContext/AuthContext/authContext";
import Header from "./components/Header";
import Edit from "./components/blogPost/edit";
import Create from "./components/blogPost/create";
import EditComment from "./components/comment/editComment";

function App() {
	const { accessToken, setCurrentUser } = useContext(AuthContext) || {};

	const fetchUser = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/user`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});
			setCurrentUser && setCurrentUser(response.data.user);
		} catch (error: ErrorResponse | any) {
			if (error?.response.status === 401) {
				localStorage.removeItem("access_token");
				setCurrentUser && setCurrentUser(null);
			}
		}
	};

	useEffect(() => {
		if (accessToken) {
			fetchUser();
		}
	}, [accessToken]);

	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/edit/:id" element={<Edit />} />
				<Route path="/create" element={<Create />} />
				<Route path="/edit/:blogPost_id/comments/:comment_id" element={<EditComment />} />
				{/* <Route path="/blog" element={<Navigation uniqueIds={uniqueIds} />}>
				<Route index element={<Blog />} />
				<Route path=":userId" element={<NewBlog users={users} />} />
			</Route> */}
			</Routes>
		</>
	);
}

export default App;
