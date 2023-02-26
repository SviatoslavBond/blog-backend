import { Schema, model } from "mongoose";

const PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true,
	},
	tags: {
		type: Array,
		default: []
	},
	viewsCount: {
		type: Number,
		default: 0
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	comentsCount: {
		type: Number,
		default: 0
	},
	imgUrl: String
}, {
	timestamps: true
});

const PostModel = model('Post', PostSchema);



export default PostModel;