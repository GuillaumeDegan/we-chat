import connectMongoDB from "@/app/libs/mongodb";
import { UserModel } from "@/app/models/users";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { username, displayName, email, phone, password } = await req.json();
	const saltRounds = 10;
	let cryptedPassword = "";
	bcrypt.hash(password, saltRounds, function (err, hash) {
		if (err) console.log("bcryptError", err);
		cryptedPassword = hash;
	});
	await connectMongoDB();
	const user = await UserModel.create({
		username,
		displayName,
		email,
		phone,
		password: cryptedPassword,
	});
	return NextResponse.json(user, { status: 201 });
}
