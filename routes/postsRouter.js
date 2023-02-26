
import checkAuth from '../middleware/checkAuth.js';
import express from 'express';
import postController from '../controllers/postControlers.js';
import { postCreateValidation, handleValidationErrors } from '../middleware/validators/index.js';
const postRouter = express.Router();


postRouter.get('/', postController.getAll);

postRouter.get('/:id', postController.getOne);
postRouter.post('/', checkAuth, postCreateValidation, handleValidationErrors, postController.createPost);
postRouter.delete('/:id', checkAuth, postController.remove);
postRouter.patch('/:id', checkAuth, postCreateValidation, handleValidationErrors, postController.update);




export default postRouter;