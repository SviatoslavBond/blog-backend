import PostModel from "../models/Post.js";
import * as fs from 'fs';

class PostController {

	async createPost(req, res) {
		try {
			const doc = new PostModel({
				title: req.body.title,
				text: req.body.text,
				tags: req.body.tags,
				user: req.userId,
				imgUrl: req.body.imgUrl,
			});
			const post = await doc.save();
			res.json(post);

		} catch (error) {
			res.status(403).json({
				error,
				message: 'Не вдалося створити статью'
			})
		}
	}

	async getAll(req, res) {
		try {
			const posts = await PostModel.find().populate('user');

			if (!posts) {
				res.status(403).json({
					message: "Posts not found"
				})
			}

			res.json({ posts })
		} catch (error) {
			res.status(404).json({
				error,
				message: "eroorr"
			})
		}
	}

	getOne(req, res) {
		try {
			const postId = req.params.id;
			PostModel.findOneAndUpdate(
				{ _id: postId },
				{ $inc: { viewsCount: 1 } },
				{ new: true })
				.populate('user')
				.exec((err, doc) => {
					if (err) {
						return res.status(500).json({
							err,
							message: "Не вдалося знайти статтю"
						})
					}
					res.json(doc)
				})
		} catch (error) {
			res.status(500).json({
				error,
				message: "eroorr"
			})
		}
	}

	async remove(req, res) {
		try {
			const postId = req.params.id;

			PostModel.findByIdAndDelete({
				_id: postId
			}, (err, doc) => {
				if (err) {
					return res.status(500).json({
						err,
						message: "Не вдалося видалити статтю"
					})
				}

				if (!doc) {
					return res.status(404).json({
						msg: " Cтаття не знайдена"
					})
				}

				if (doc.imgUrl) {
					fs.unlink(`.${doc.imgUrl}`, (err) => {
						if (err) {
							res.status(500).json('Failed to delete file');
							return;
						}
						res.status(200).json({
							deleteImage: true,
							success: true
						});
					})
				} else {
					res.json({
						deleteImage: false,
						success: true
					});
				}

			})
		} catch (error) {
			res.status(500).json({
				error,
				message: "eroorr"
			})
		}
	}

	async update(req, res) {
		try {
			const postId = req.params.id;
			const postUpdated = await PostModel.updateOne({
				_id: postId
			}, {
				title: req.body.title,
				text: req.body.text,
				tags: req.body.tags,
				user: req.userId,
				imgUrl: req.body.imgUrl,
			})
			res.json({
				success: true
			})
		} catch (error) {
			res.status(500).json({
				error,
				message: "Не вдалося оновити статтю"
			})
		}
	}



	deleteImage(req, res) {
		try {
			const path = req.body.path

			fs.unlink(`.${path}`, (err) => {
				if (err) {
					res.status(500).json('Failed to delete file');
					return;
				}
				res.json({
					deleteImage: true,
					success: true
				});
			})
		} catch (error) {
			res.status(500).json(error)
		}
	}


}
export default new PostController();