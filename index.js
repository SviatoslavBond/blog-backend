import express from 'express';
import * as dotenv from 'dotenv'

import cors from 'cors';
import connectToDB from './utils/conectToDB.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRouter, postRouter, comentRouter } from './routes/index.js';
import checkAuth from './middleware/checkAuth.js';
import { upload } from './middleware/multer.js';
import tagsController from './controllers/tagsController.js';
import postController from './controllers/postControlers.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
console.log(process.env.PORT);
const app = express();
connectToDB();
app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());


app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/', comentRouter);
app.delete('/deleteImg', checkAuth, postController.deleteImage);

app.get('/tags', tagsController.getLastTags);
app.post("/upload", checkAuth, upload.single("image"), function (req, res) {
	let filedata = req.file;
	if (!filedata)
		res.status(403).send("Файл не загружен");
	else
		res.json({
			url: `/uploads/${filedata.originalname}`
		})
});

app.listen(process.env.PORT, (err) => {
	if (err) {
		return console.log(' server errror');
	}
	console.log('Server OK');
})

