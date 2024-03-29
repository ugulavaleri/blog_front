import React, { createContext, useState } from "react";

export interface AuthContextProps {
	accessToken: any;
	setAccessToken: React.Dispatch<any>;
	currentUser: any;
	setCurrentUser: React.Dispatch<any>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface props {
	children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: props) => {
	const [accessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem("access_token") || "null"));
	const [currentUser, setCurrentUser] = useState<any>(null);

	const authContextValue: AuthContextProps = {
		accessToken,
		setAccessToken,
		currentUser,
		setCurrentUser,
	};

	return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
