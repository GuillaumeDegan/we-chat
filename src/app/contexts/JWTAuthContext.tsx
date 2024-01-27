"use client";
import { useRouter } from "next/navigation";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { env } from "../../../config";
import { User } from "../models/users";

interface AuthContextProps {
	user: Omit<User, "password"> | undefined;
	login: (userData: Pick<User, "password" | "username">) => void;
	logout: () => void;
}

const defaultAuthContext: AuthContextProps = {
	user: undefined,
	login: () => {},
	logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<Omit<User, "password">>();
	const router = useRouter();

	const getConnectedUser = async (token: string) => {
		const response = await fetch(
			`${env.NEXT_PUBLIC_SITE_URL}api/getConnectedUser`,
			{
				method: "POST",
				body: JSON.stringify({ token }),
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		return response;
	};

	useEffect(() => {
		const checkConnection = async () => {
			try {
				const token = localStorage.getItem("accessToken");
				if (token) {
					const response = await getConnectedUser(token);

					if (!response) {
						router.push("/");
						setUser(undefined);
					} else {
						console.log("Ready to be connected : ", response.json());
					}
				}
			} catch (error) {
				console.log(error);
				setUser(undefined);
			}
		};
		checkConnection();
	}, [router]);

	const login = async (userData: Pick<User, "password" | "username">) => {
		try {
			const response = await fetch(`${env.NEXT_PUBLIC_SITE_URL}api/login`, {
				method: "POST",
				body: JSON.stringify(userData),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const { token } = await response.json();

			if (token) {
				localStorage.setItem("accessToken", token);

				const response = await getConnectedUser(token);

				console.log("Ready to be connected : ", response.json());

				// router.push("/home");
			} else {
				console.log("Not connected", token);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const logout = () => {
		setUser(undefined);
		localStorage.removeItem("accessToken");
		router.push("/");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
