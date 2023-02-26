import { Schema, model } from "mongoose";

const UserSchema = new Schema({
	fullname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	passwordHash: {
		type: String,
		required: true,
	},
	avatarURL: String
}, {
	timestamps: true
})
const UserModel = model('User', UserSchema);



export default UserModel;