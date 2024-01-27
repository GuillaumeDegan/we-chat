import connectMongoDB from "@/app/libs/mongodb";
import { FriendModel, Status } from "@/app/models/friends";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params;

		console.log("id", id);

		let friends = [];

		await connectMongoDB();
		const senderInRequest = await FriendModel.find({
			sender: { $regex: id },
			status: Status.ACCEPTED,
		}).populate("receiver");

		const receiverInRequest = await FriendModel.find({
			receiver: { $regex: id },
			status: Status.ACCEPTED,
		}).populate("sender");

		friends = [
			...senderInRequest.map((friend) => friend.receiver),
			...receiverInRequest.map((friend) => friend.sender),
		];

		console.log("friends", friends);

		return NextResponse.json({ friends: friends }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
