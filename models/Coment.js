import mongoose, { Schema, model } from "mongoose";

const ComentSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	likeCount: {
		type: Number,
		default: 0
	},
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
}, {
	timestamps: true
});

const ComentModel = model('Coment', ComentSchema);
export default ComentModel;