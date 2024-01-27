"use client";

import ChatContainer from "../components/ChatContainer";
import FriendList from "../components/ConversationList";
import GlobalNav from "../components/GlobalNav";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<GlobalNav />
			<div className="flex w-full">
				<div className="w-2/12">
					<FriendList />
				</div>
				<div className="w-10/12">
					<ChatContainer />
				</div>
			</div>
		</main>
	);
}
