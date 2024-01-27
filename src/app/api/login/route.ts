import connectMongoDB from "@/app/libs/mongodb";
import { UserModel } from "@/app/models/users";
import { generateJwtToken } from "@/app/utils/auth";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { username, password } = await req.json();
	await connectMongoDB();
	const user = await UserModel.findOne({
		username,
	});

	if (!user) throw new Error("USER_NOT_FOUND");

	const result = await new Promise<boolean>((resolve, reject) => {
		bcrypt.compare(password, user.password, (err, result) => {
			if (err) {
				console.log("bcryptError", err);
				reject(err);
			} else {
				resolve(result);
			}
		});
	});

	if (result) {
		const payload = {
			userId: user._id,
		};

		const token = await generateJwtToken(payload);

		return NextResponse.json({ token }, { status: 201 });
	} else {
		return NextResponse.json({ token: null }, { status: 201 });
	}
}
