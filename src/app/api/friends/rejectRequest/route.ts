import connectMongoDB from "@/app/libs/mongodb";
import { FriendModel, Status } from "@/app/models/friends";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { id } = await req.json();

		if (!id) throw new Error("FRIEND_REQUEST_ID_NOT_PROVIDED");

		await connectMongoDB();

		const friendRequest = await FriendModel.findById(id);

		if (!friendRequest) throw new Error("FRIEND_REQUEST_NOT_FOUND");

		if (friendRequest.status !== Status.SENT)
			throw new Error("FRIEND_REQUEST_IS_NOT_SENT");

		const rejectFriendRequest = await FriendModel.findByIdAndUpdate(id, {
			status: Status.UNLINKED,
		});

		if (!rejectFriendRequest)
			throw new Error("ERROR_WHILE_REJECTING_FRIEND_REQUEST");

		return NextResponse.json({ rejectFriendRequest }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
