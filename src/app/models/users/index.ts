import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";

export class User {
	@prop({ type: String, required: true })
	username!: string;

	@prop({ type: String, required: true })
	displayName!: string;

	@prop({ type: String, required: true })
	email!: string;

	@prop({ type: String, required: true })
	phone!: string;

	@prop({ type: String, required: true })
	password!: string;

	@prop({ type: String, required: false })
	picture?: string;
}

export const UserModel = getModelForClass(User, {
	existingMongoose: mongoose,
	existingConnection: mongoose.connection,
});
