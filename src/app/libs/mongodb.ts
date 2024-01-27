import mongoose from "mongoose";
import { env } from "../../../config";

type Connection = {
	isConnected: boolean;
};

const connection: Connection = { isConnected: false };

const connectMongoDB = async () => {
	if (connection.isConnected) return;

	try {
		if (!env.MONGODB_URI)
			throw new Error("Please define the mongo URI in the .env folder.");
		await mongoose.connect(env.MONGODB_URI);

		connection.isConnected = true;
		console.log("Connected to mongoDB");
	} catch (error) {
		console.log(error);
	}
};

export default connectMongoDB;
