import PostModel from "../models/Post.js";

class TagsController {
	async getLastTags(req, res) {
		try {
			const posts = await PostModel.find().limit(5).exec();
			const tags = posts.map(obj => obj.tags).flat().splice(0, 4)
			if (!posts) {
				res.status(403).json({
					message: "Posts not found"
				})
			}

			res.json({ tags })
		} catch (error) {
			res.status(404).json({
				error,
				message: "eroorr"
			})
		}
	}
}
export default new TagsController()