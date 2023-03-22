import ComentModel from "../models/Coment.js";
import PostModel from "../models/Post.js";
class ComentController {

	async createComent(req, res) {
		try {
			const doc = new ComentModel({
				text: req.body.text,
				post: req.body.postId,
				user: req.userId,

			});
			const coment = await (await doc.save()).populate('user');
			await PostModel.findOneAndUpdate(
				{ _id: req.body.postId },
				{ $inc: { comentsCount: 1 } }, {
				new: true
			})


			res.json(coment);

		} catch (error) {
			res.status(403).json({
				error,
				message: 'Не  вдалося створити   коментар'
			})
		}
	}

	async getAll(req, res) {
		try {
			const coments = await ComentModel.find().populate('user');
			if (!coments) {
				res.status(403).json({
					message: "Posts not found"
				})
			}

			res.json(coments)

		} catch (error) {
			res.status(403).json({
				error,
				message: 'Не отримати коментарі'
			})
		}
	}
	async getComentsByPostId(req, res) {
		try {
			const postId = req.params.id;
			const coments = await ComentModel.find({ post: postId }).populate('user')

			res.json(coments)

		} catch (error) {
			res.status(500).json(error)
		}
	}

	async increaselike(req, res) {
		try {
			const postId = req.params.id;
			ComentModel.findOneAndUpdate(
				{ _id: postId },
				{ $inc: { likeCount: 1 } },
				{ new: true })
				.exec((err, doc) => {
					if (err) {
						return res.status(500).json({
							err,
							message: "Не вдалося знайти коментар"
						})
					}
					res.json(doc)
				})

		} catch (error) {
			res.status(500).json(error)
		}
	}
	async decreaselike(req, res) {
		try {
			const postId = req.params.id;
			ComentModel.findOneAndUpdate(
				{ _id: postId },
				{ $inc: { likeCount: -1 } },
				{ new: true })
				.exec((err, doc) => {
					if (err) {
						return res.status(500).json({
							err,
							message: "Не вдалося знайти коментар"
						})
					}
					res.json(doc)
				})

		} catch (error) {
			res.status(500).json(error)
		}
	}



}
export default new ComentController