import { User } from "@/app/models/users";
import { LoginTabs } from "@/app/page";
import { Dispatch, SetStateAction, useState } from "react";
import { env } from "../../../../config";

interface RegisterProps {
	setTab: Dispatch<SetStateAction<LoginTabs>>;
}

/* eslint-disable @next/next/no-img-element */
export default function Register({ setTab }: RegisterProps) {
	const [registerUser, setRegisterUser] = useState<User>({
		displayName: "",
		email: "",
		password: "",
		phone: "",
		username: "",
	});

	const register = async () => {
		try {
			const response = await fetch(`${env.NEXT_PUBLIC_SITE_URL}api/register`, {
				method: "POST",
				body: JSON.stringify(registerUser),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const user: User = await response.json();

			console.log(user);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<input
				type="text"
				placeholder="username"
				className="text-black"
				value={registerUser.username}
				onChange={(e) =>
					setRegisterUser({ ...registerUser, username: e.target.value })
				}
			/>
			<input
				type="text"
				placeholder="Display name"
				className="text-black"
				value={registerUser.displayName}
				onChange={(e) =>
					setRegisterUser({
						...registerUser,
						displayName: e.target.value,
					})
				}
			/>
			<input
				type="text"
				placeholder="email"
				className="text-black"
				value={registerUser.email}
				onChange={(e) =>
					setRegisterUser({ ...registerUser, email: e.target.value })
				}
			/>
			<input
				type="text"
				placeholder="phone"
				className="text-black"
				value={registerUser.phone}
				onChange={(e) =>
					setRegisterUser({ ...registerUser, phone: e.target.value })
				}
			/>
			<input
				type="password"
				name="password"
				id=""
				placeholder="password"
				className="text-black"
				value={registerUser.password}
				onChange={(e) =>
					setRegisterUser({ ...registerUser, password: e.target.value })
				}
			/>
			<button
				className="p-2 rounded-sm bg-gray-600 mb-2 mt-8"
				onClick={register}
			>
				REGISTER
			</button>
			<p
				className="underline text-black cursor-pointer"
				onClick={() => setTab("login")}
			>
				already have an account ?
			</p>
		</>
	);
}
