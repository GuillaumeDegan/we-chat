import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../../config";

export const generateJwtToken = async (payload: Object) => {
	const options: SignOptions = {
		expiresIn: "10 days",
	};

	const token = await jwt.sign(payload, env.JWT_SECRET, options);

	return token;
};
