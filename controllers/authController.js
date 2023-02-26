
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

class AuthController {

	async registration(req, res) {
		try {
			const isUser = await UserModel.findOne({ email: req.body.email })
			if (isUser) {
				return res.status(403).json({ message: 'Пользователь с таким логином уже существует' })
			}

			const password = req.body.password;
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			const doc = new UserModel({
				email: req.body.email,
				fullname: req.body.fullname,
				avatarURL: req.body.avatarURL,
				passwordHash: hash
			})

			const user = await doc.save();

			const { passwordHash, ...usedData } = user._doc;

			const token = jwt.sign({
				_id: user._id
			}, 'secret key', { expiresIn: "30d" })

			res.json({ ...usedData, token })

		} catch (err) {
			console.log(err);
			res.status(500).json({ message: 'Не удалось зарегестрироватся' })
		}
	}

	async login(req, res) {
		try {
			const user = await UserModel.findOne({ email: req.body.email });

			if (!user) {
				return res.status(404).json({
					message: 'Can not find user'
				})
			}
			const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

			if (!isValidPass) {
				return res.status(404).json({
					message: 'Invalid login or password'
				})
			}
			const { passwordHash, ...usedData } = user._doc;

			const token = jwt.sign({
				_id: user._id
			}, 'secret key', { expiresIn: "30d" })

			res.json({ ...usedData, token })

		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Login is failure' })
		}
	}

	async getUser(req, res) {
		try {
			const user = await UserModel.findById(req.userId);
			if (!user) {
				res.status(403).json({
					message: "Can not find user"
				})
			}

			res.json(user)
		} catch (error) {
			res.status(404).json({
				error,
				message: "eroorr"
			})
		}
	}

	async getUsers(req, res) {
		try {
			const users = await UserModel.find();
			res.json({ users });

		} catch (error) {
			res.status(404).json({
				message: "erRoor"
			})
		}
	}

	uploadUserAvatar(req, res) {
		let filedata = req.file;

		if (!filedata)
			res.status(403).send("Файл не завантажений");
		else
			res.json({
				url: `/uploads/users_foto/${filedata.originalname}`
			})

	}

}

export default new AuthController();
