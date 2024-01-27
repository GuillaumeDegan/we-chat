/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/app/contexts/JWTAuthContext";
import { useRouter } from "next/navigation";

export default function GlobalNav() {
	const { user } = useAuth();
	const router = useRouter();

	console.log(user);
	return (
		<div className="flex justify-end items-center p-3 h-50 bg-slate-500 w-full">
			<p className="cursor-pointer mr-5" onClick={() => router.push("/home")}>
				Home
			</p>
			<p
				className="cursor-pointer mr-5"
				onClick={() => router.push("/friends")}
			>
				Friends
			</p>
			<div className="group flex relative" onClick={() => router.push("/home")}>
				<img
					data-tooltip-target="tooltip-profile"
					src={user?.picture || "/default-avatar.jpg"}
					alt="profile"
					className="h-10 w-10 rounded-full cursor-pointer hover:opacity-50"
				/>
				<span
					className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto"
				>
					Profile
				</span>
			</div>
		</div>
	);
}
