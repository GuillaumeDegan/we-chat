/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/app/contexts/JWTAuthContext";

export default function ConversationList() {
	const { user } = useAuth();

	const conversations = [
		{
			_id: "565486",
			name: "Robin",
			picture:
				"https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/03/web-images.jpg?auto=format&q=60&w=1600&h=824&fit=crop&crop=faces",
			status: "Online",
		},
		{
			_id: "5645895455486",
			name: "Valentin",
			picture:
				"https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/03/web-images.jpg?auto=format&q=60&w=1600&h=824&fit=crop&crop=faces",
			status: "Do not disturb",
		},
	];

	return (
		<div className="p-8 bg-white flex flex-col items-center w-full h-screen">
			<h2 className="font-bold text-black text-xl mb-5">Conversation list</h2>
			<button className="bg-slate-500 rounded-lg p-3 mb-5">
				Add conversation
			</button>
			<div className="w-full">
				{conversations.map((conversation) => {
					let statusColor = "grey";

					switch (conversation.status) {
						case "Online":
							statusColor = "green";
							break;
						case "Do not disturb":
							statusColor = "yellow";
							break;
						case "Offline":
							statusColor = "red";
							break;

						default:
							break;
					}

					return (
						<div className="flex items-center my-3" key={conversation._id}>
							<img
								src={conversation.picture}
								className="w-10 h-10 rounded-full mr-3"
								alt={`profile picture of ${conversation.name}`}
							/>
							<div>
								<p className="text-black font-bold">{conversation.name}</p>
								<div className="flex items-center">
									<div
										style={{ backgroundColor: statusColor }}
										className="w-3 h-3 rounded-full mr-2"
									></div>
									<p className="text-gray-600">{conversation.status}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
