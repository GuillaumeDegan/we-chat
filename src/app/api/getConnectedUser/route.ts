import connectMongoDB from "@/app/libs/mongodb";
import { UserModel } from "@/app/models/users";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { env } from "../../../../config";

export async function POST(req: NextRequest) {
	const { token } = await req.json();

	if (!token) {
		return NextResponse.json({ error: "Token is missing" }, { status: 400 });
	}

	try {
		let decodedToken: JwtPayload;

		try {
			decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
		} catch (error) {
			return NextResponse.json({ error: "Invalid token" }, { status: 401 });
		}

		await connectMongoDB();
		const user = UserModel.findById(decodedToken.userId);

		if (!user)
			return NextResponse.json({ error: "User not found" }, { status: 404 });

		delete user.password;

		return NextResponse.json({ user }, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Invalid token 2" }, { status: 401 });
	}
}
