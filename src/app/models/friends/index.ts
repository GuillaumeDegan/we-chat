import type { Ref } from "@typegoose/typegoose";
import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { User } from "../users";

export enum Status {
	SENT = "SENT",
	ACCEPTED = "ACCEPTED",
	UNLINKED = "UNLINKED",
}

export class Friend {
	@prop({ type: String, required: true })
	_id!: string;

	@prop({ type: String, ref: User, required: true })
	receiver!: Ref<User>;

	@prop({ type: String, ref: User, required: true })
	sender!: Ref<User>;

	@prop({ type: String, required: true })
	status!: Status;
}

export const FriendModel = getModelForClass(Friend, {
	existingMongoose: mongoose,
	existingConnection: mongoose.connection,
});
