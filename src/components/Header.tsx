import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../helpers/api";
import { AuthContext } from "../GlobalContext/AuthContext/authContext";

function Header() {
	const { currentUser, accessToken, setCurrentUser, setAccessToken } = useContext(AuthContext) || {};
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await axios.post(
				`${BASE_URL}/user/logout`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			localStorage.removeItem("access_token");
			setCurrentUser && setCurrentUser(null);
			setAccessToken && setAccessToken("");
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className="bg-gray-800 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="text-xl font-semibold">
					Blog Post
				</Link>
				<div>
					<ul className="flex items-center space-x-4">
						<li>
							<Link to="/" className="hover:text-gray-300 transition duration-150 ease-in-out">
								Home
							</Link>
						</li>
						{currentUser ? (
							<>
								<p>{currentUser.name}</p>
								<Link className="text-white transition duration-150 ease-in-out rounded px-4 py-2" to={"/create"}>
									Create Blog Post
								</Link>
								<button
									onClick={logout}
									className="text-white bg-red-500 hover:bg-red-700 transition duration-150 ease-in-out rounded px-4 py-2"
								>
									Logout
								</button>
							</>
						) : (
							<>
								<li>
									<Link to="/register" className="hover:text-gray-300 transition duration-150 ease-in-out">
										Register
									</Link>
								</li>
								<li>
									<Link to="/login" className="hover:text-gray-300 transition duration-150 ease-in-out">
										Login
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Header;
