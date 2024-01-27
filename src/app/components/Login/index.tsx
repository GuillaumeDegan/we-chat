import { useAuth } from "@/app/contexts/JWTAuthContext";
import { User } from "@/app/models/users";
import { LoginTabs } from "@/app/page";
import { Dispatch, SetStateAction, useState } from "react";

interface LoginResponse {
	user?: User;
	isConnected: boolean;
}

interface LoginProps {
	setTab: Dispatch<SetStateAction<LoginTabs>>;
}

/* eslint-disable @next/next/no-img-element */
export default function Login({ setTab }: LoginProps) {
	const [loginUser, setLoginUser] = useState<
		Pick<User, "password" | "username">
	>({
		password: "",
		username: "",
	});
	const { login } = useAuth();

	return (
		<>
			<input
				type="text"
				placeholder="username"
				className="text-black"
				value={loginUser.username}
				onChange={(e) =>
					setLoginUser({ ...loginUser, username: e.target.value })
				}
			/>
			<input
				type="password"
				name="password"
				id=""
				placeholder="password"
				className="text-black"
				value={loginUser.password}
				onChange={(e) =>
					setLoginUser({ ...loginUser, password: e.target.value })
				}
			/>
			<button
				className="p-2 rounded-sm bg-gray-600 mb-2 mt-8"
				onClick={() => login(loginUser)}
			>
				LOGIN
			</button>
			<p
				className="underline text-black cursor-pointer"
				onClick={() => setTab("register")}
			>
				dont have an account yet ?
			</p>
		</>
	);
}
