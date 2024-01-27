/* eslint-disable @next/next/no-img-element */
"use client";

export default function ChatContainer() {
	return (
		<div className="bg-slate-300 flex flex-col items-center w-full h-screen">
			<div className="w-full bg-slate-400 flex justify-center py-2 ">
				<div className="flex items-center my-3">
					<img
						src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/03/web-images.jpg?auto=format&q=60&w=1600&h=824&fit=crop&crop=faces"
						className="w-10 h-10 rounded-full mr-3"
						alt={`profile picture of Robin`}
					/>
					<div>
						<p className="text-black font-bold">Robin</p>
						<div className="flex items-center">
							<div
								style={{ backgroundColor: "green" }}
								className="w-3 h-3 rounded-full mr-2"
							></div>
							<p className="text-gray-600">Online</p>
						</div>
					</div>
				</div>
			</div>
			<div className="h-screen">chat box</div>
			<div className="bg-slate-400 w-full p-2 flex justify-between">
				<input
					type="text"
					placeholder="Message..."
					className="rounded-md p-1 w-10/12 text-black"
				/>
				<button className="bg-slate-500 rounded-lg p-3 ml-3 w-2/12">
					Send
				</button>
			</div>
		</div>
	);
}
