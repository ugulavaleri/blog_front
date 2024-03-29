import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ErrorResponse, useNavigate, useNavigation } from "react-router";
import { BASE_URL } from "../../helpers/api";
import Validation from "../../helpers/validation";
import { AuthContext } from "../../GlobalContext/AuthContext/authContext";
import Spinner from "../../helpers/spinner";

function Registration() {
	const { accessToken, setAccessToken, setCurrentUser } = useContext(AuthContext) || {};
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [errors, setErrors] = useState({});
	const [isLoading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		// if (typeof accessToken === "object") {
		// 	return;
		// }
		if (accessToken) {
			return navigate("/");
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});
		setLoading(true);

		const data = { name, email, password };

		try {
			const response = await axios.post(`${BASE_URL}/user/register`, data);
			localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
			setAccessToken && setAccessToken(response.data.access_token);
			setCurrentUser && setCurrentUser(response.data.user);
			setErrors(false);
			setName("");
			setEmail("");
			setPassword("");
			navigate("/");
			setLoading(false);
		} catch (error: ErrorResponse | any) {
			setErrors(true);
			setLoading(false);
			if (error.response.status === 422) {
				setErrors(error.response.data.errors);
			}
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
				<h4 className="text-2xl font-semibold text-center mb-6">Create New Account</h4>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						{Validation(errors, "name")}
					</div>
					<div className="mb-4">
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email address
						</label>
						<input
							type="email"
							className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{Validation(errors, "email")}
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{Validation(errors, "password")}
					</div>
					<div className="flex justify-center">
						{isLoading ? (
							<Spinner />
						) : (
							<button
								type="submit"
								className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white rounded-md"
							>
								Submit
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}

export default Registration;
