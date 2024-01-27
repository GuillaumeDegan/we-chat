import connectMongoDB from "@/app/libs/mongodb";
import { FriendModel, Status } from "@/app/models/friends";
import { UserModel } from "@/app/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { sender, receiver } = await req.json();

		await connectMongoDB();

		const isSenderValid = await UserModel.findById(sender);

		if (!isSenderValid) throw new Error("FRIEND_REQUEST_SENDER_NOT_FOUND");

		const isReceiverValid = await UserModel.findById(receiver);

		if (!isReceiverValid) throw new Error("FRIEND_REQUEST_RECEIVER_NOT_FOUND");

		const friend = await FriendModel.create({
			_id: sender + receiver,
			sender,
			receiver,
			status: Status.SENT,
		});

		if (!friend) return;

		return NextResponse.json({ friend }, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
