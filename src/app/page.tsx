"use client";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

export type LoginTabs = "landing" | "login" | "register";

/* eslint-disable @next/next/no-img-element */
export default function LoginPage() {
	const [tab, setTab] = useState<LoginTabs>("landing");

	const displayTabs = () => {
		switch (tab) {
			case "landing":
				return (
					<>
						<button
							className="p-2 rounded-sm bg-gray-600 mb-2 mt-8"
							onClick={() => setTab("login")}
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
			case "login":
				return <Login setTab={setTab} />;
			case "register":
				return <Register setTab={setTab} />;
			default:
				break;
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="bg-gray-900 p-5 rounded-md flex flex-col items-center">
				<img className="w-10" src="/slack-logo.svg" alt="" />
				{displayTabs()}
			</div>
		</main>
	);
}
