import { useContext, useEffect, useState } from "react";
import { ErrorResponse, useNavigate } from "react-router";
import { AuthContext } from "../../GlobalContext/AuthContext/authContext";
import { BASE_URL } from "../../helpers/api";
import axios from "axios";
import Spinner from "../../helpers/spinner";
import Validation from "../../helpers/validation";
import { toast } from "react-toastify";

function Login() {
	const { accessToken, setAccessToken, setCurrentUser } = useContext(AuthContext) || {};
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [errors, setErrors] = useState({});
	const [isLoading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (accessToken) {
			return navigate("/");
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});
		setLoading(true);

		const data = { email, password };

		try {
			const response = await axios.post(`${BASE_URL}/user/login`, data);

			localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
			setAccessToken && setAccessToken(response.data.access_token);
			setCurrentUser && setCurrentUser(response.data.user);
			setErrors(false);
			setEmail("");
			setPassword("");
			navigate("/");
			setLoading(false);
			toast.success("Loggined successfully!");
		} catch (error: ErrorResponse | any) {
			setLoading(false);
			if (error.response.status === 422) {
				setErrors(error.response.data.errors);
			}
			if (error.response.status === 401) {
				setErrors({ password: error.response.data.error });
			}
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
				<h4 className="text-lg text-center font-semibold mb-6">Log In</h4>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email address
						</label>
						<input
							type="email"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{Validation(errors, "email")}
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						{Validation(errors, "password")}
					</div>
					<div className="flex items-center justify-between">
						{isLoading ? (
							<Spinner />
						) : (
							<button
								type="submit"
								className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Login
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
