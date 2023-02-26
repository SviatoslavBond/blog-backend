import multer from 'multer';
import fs from 'fs';
const storageConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(fs.existsSync('uploads'));
		if (!fs.existsSync('uploads')) {
			fs.mkdirSync('uploads')
		}
		if (!fs.existsSync('uploads/users_foto')) {
			fs.mkdirSync('uploads/users_foto')
		}
		if (req.originalUrl === '/auth/upload/user-avatar') {
			cb(null, 'uploads/users_foto');
		} else {
			cb(null, "uploads");
		}
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});
export const upload = multer({ storage: storageConfig });